import { Router } from "./Router";

describe("Router", () => {
  it("should listen onpopstate", () => {
    const router = new Router("/");
    router.start();
    expect(window.onpopstate).toBeInstanceOf(Function);
  });

  it("should add routes", () => {
    const router = new Router("/");
    router.use("/", () => null);
    // @ts-expect-error Property 'routes' is private
    expect(router.routes["/"]).toBeInstanceOf(Function);
  });

  it("should change history", () => {
    const router = new Router("/");
    router.use("/signin", () => null);
    const lengthBefore = window.history.length;
    router.go("/signin");
    expect(window.history.length).toBeGreaterThanOrEqual(lengthBefore);
  });

  it("should change location pathname", () => {
    const router = new Router("/");
    router.use("/signup", () => null);
    router.go("/signup");
    expect(window.location.pathname).toBe("/signup");
  });

  it("should respect basename for GitHub Pages", () => {
    const router = new Router("/windows-3.1-retro-style-messenger/");
    let visited = "";
    router.use("/messenger", () => {
      visited = "/messenger";
    });
    router.go("/messenger");
    expect(window.location.pathname).toBe(
      "/windows-3.1-retro-style-messenger/messenger"
    );
    expect(visited).toBe("/messenger");
  });
});
