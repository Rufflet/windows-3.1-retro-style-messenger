import { Router, Store, renderDOM } from "core";
import { getScreenComponent, Views } from "utils";

const routes = [
  {
    path: "/messenger",
    block: Views.Messenger,
    shouldAuthorized: true,
  },
  {
    path: "/cover",
    block: Views.Cover,
    shouldAuthorized: false,
  },
  {
    path: "/signin",
    block: Views.SignIn,
    shouldAuthorized: false,
  },
  {
    path: "/signup",
    block: Views.SignUp,
    shouldAuthorized: false,
  },
  {
    path: "/profile",
    block: Views.Profile,
    shouldAuthorized: true,
  },
  {
    path: "/profile/edit",
    block: Views.ProfileEdit,
    shouldAuthorized: true,
  },
  {
    path: "/profile/password-change",
    block: Views.PasswordChange,
    shouldAuthorized: true,
  },
  {
    path: "/error/404",
    block: Views.Error404,
    shouldAuthorized: false,
  },
  {
    path: "/error/500",
    block: Views.Error500,
    shouldAuthorized: false,
  },
  {
    path: "*",
    block: Views.Cover,
    shouldAuthorized: false,
  },
];

export function initRouter(router: Router, store: Store<AppState>) {
  routes.forEach((route) => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ view: route.block });
        return;
      }

      if (!isAuthorized && route.shouldAuthorized) {
        router.go(Views.SignIn);
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on("changed", (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.view !== nextState.view) {
      const Page = getScreenComponent(nextState.view);
      renderDOM(new Page({}));
      document.title = `Мессенджер / ${Page.componentName}`;
    }
  });
}
