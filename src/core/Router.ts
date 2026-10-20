function normalizeBasename(basename: string): string {
  if (!basename || basename === "/") {
    return "";
  }
  return basename.replace(/\/$/, "");
}

export class Router {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private routes: Record<string, Function> = {};

  private isStarted = false;

  private basename: string;

  constructor(basename: string = process.env.PUBLIC_PATH || "/") {
    this.basename = normalizeBasename(basename);
  }

  start() {
    if (!this.isStarted) {
      this.isStarted = true;

      window.onpopstate = (_event: PopStateEvent) => {
        this.onRouteChange.call(this);
      };

      this.onRouteChange();
    }
  }

  private stripBasename(pathname: string): string {
    if (!this.basename) {
      return pathname || "/";
    }

    if (pathname === this.basename) {
      return "/";
    }

    if (pathname.startsWith(`${this.basename}/`)) {
      return pathname.slice(this.basename.length) || "/";
    }

    return pathname || "/";
  }

  private withBasename(pathname: string): string {
    if (!this.basename) {
      return pathname;
    }
    if (pathname === "/") {
      return `${this.basename}/`;
    }
    return `${this.basename}${pathname}`;
  }

  private onRouteChange(pathname: string = window.location.pathname) {
    const appPath = this.stripBasename(pathname);

    const found = Object.entries(this.routes).some(([routeHash, callback]) => {
      if (routeHash === appPath) {
        callback();
        return true;
      }
      return false;
    });

    if (!found && this.routes["*"]) {
      this.routes["*"]();
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  use(hash: string, callback: Function) {
    this.routes[hash] = callback;
    return this;
  }

  go(pathname: string) {
    window.history.pushState({}, "", this.withBasename(pathname));
    this.onRouteChange();
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}
