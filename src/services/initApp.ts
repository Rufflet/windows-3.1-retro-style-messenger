import AuthAPI from "api/auth";
import { UserDTO } from "api/types/auth";
import type { Dispatch } from "core";
import { transformUser, apiHasError } from "../utils";

export async function initApp(dispatch: Dispatch<AppState>) {
  // Ручкая задержка для демонстрации загрузочного экрана
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 700));

  try {
    const response = await AuthAPI.me();

    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
