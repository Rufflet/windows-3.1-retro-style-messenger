import { registerComponent, Router, Store } from "core";
import { initApp } from "services/initApp";
import { defaultState } from "store";
import Handlebars from "handlebars";
import { initRouter } from "./routes";
import * as components from "./components";

import "./style/main.css";

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

Handlebars.registerHelper("whosMessage", function (arg1, _options) {
  return arg1 !== window.store.getState()?.user?.id ? "recieved" : "sent";
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;

  store.on("changed", (_prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log(
        "%cstore updated",
        "background: #222; color: #bada55",
        nextState
      );
    }
  });

  /**
   * Инициализируем роутер
   */
  initRouter(router, store);

  /**
   * Загружаем данные для приложения
   */
  store.dispatch(initApp);
});
