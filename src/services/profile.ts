import UserAPI from "api/user";
import type { Dispatch } from "core";
import { transformUser, apiHasError } from "utils";
import { Views } from "utils/views";
import { logout } from "./auth";
import type {
  ChangeUserDataPayload,
  UploadAvatarPayload,
  ChangeUserPasswordPayload,
} from "./types/user";

export const changeUserData = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: ChangeUserDataPayload
) => {
  dispatch({ isLoading: true });

  console.log("changeUserData", action);

  const response = await UserAPI.changeUserData(action);

  dispatch({ isLoading: false });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(response) });

  window.router.go(Views.Profile);
};

export const changeAvatar = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: UploadAvatarPayload
) => {
  dispatch({ isLoading: true });

  const response = await UserAPI.changeAvatar(action);

  dispatch({ isLoading: false, user: transformUser(response) });
};

export const changePassword = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: ChangeUserPasswordPayload
) => {
  dispatch({ isLoading: true });

  const response = await UserAPI.changeUserPassword(action);

  dispatch({ isLoading: false });

  if (apiHasError(response)) {
    dispatch({ passwordChangeFormError: response.reason });
    return;
  }

  window.router.go(Views.Profile);
};
