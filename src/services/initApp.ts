import AuthAPI from "api/auth";
import { UserDTO } from "api/types/auth";
import type { Dispatch } from "core";
import { transformUser, apiHasError, Views } from "utils";

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await AuthAPI.me();

    if (apiHasError(response)) {
      window.router.go(document.location.pathname);
      return;
    }

    dispatch({ user: transformUser(response as UserDTO) });

    if (document.location.pathname === "/") {
      window.router.go(Views.Messenger);
    } else {
      window.router.go(document.location.pathname);
    }
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
