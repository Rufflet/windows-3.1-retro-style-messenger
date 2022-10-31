import UserAPI from "api/user";
import { transformUser, apiHasError } from "utils";
import { Views } from "utils/views";
import { logout } from "./auth";
import type {
  ChangeUserDataPayload,
  UploadAvatarPayload,
  ChangeUserPasswordPayload,
} from "./types/user";

export const changeUserData: DispatchStateHandler<
  ChangeUserDataPayload
> = async (dispatch, _state, action) => {
  try {
    dispatch({ isLoading: true });

    const response = await UserAPI.changeUserData(action);

    dispatch({ isLoading: false });

    if (apiHasError(response)) {
      dispatch(logout);
      return;
    }

    dispatch({ user: transformUser(response) });

    window.router.go(Views.Profile);
  } catch (err) {
    console.error(err);
  }
};

export const changeAvatar: DispatchStateHandler<UploadAvatarPayload> = async (
  dispatch,
  _state,
  action
) => {
  try {
    dispatch({ isLoading: true });

    const response = await UserAPI.changeAvatar(action);

    dispatch({ isLoading: false, user: transformUser(response) });
  } catch (err) {
    console.error(err);
  }
};

export const changePassword: DispatchStateHandler<
  ChangeUserPasswordPayload
> = async (dispatch, _state, action) => {
  try {
    dispatch({ isLoading: true });

    const response = await UserAPI.changeUserPassword(action);

    dispatch({ isLoading: false });

    if (apiHasError(response)) {
      dispatch({ passwordChangeFormError: response.reason });
      return;
    }

    window.router.go(Views.Profile);
  } catch (err) {
    console.error(err);
  }
};
