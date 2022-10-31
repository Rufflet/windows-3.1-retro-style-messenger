import AuthAPI from "api/auth";
import { UserDTO } from "api/types/auth";
import { Views, transformUser, apiHasError } from "utils";
import type { Dispatch } from "core";
import type { SignInPayload, SignUpPayload } from "./types/auth";

export const logout = async (dispatch: Dispatch<AppState>) => {
  try {
    dispatch({ isLoading: true });

    await AuthAPI.logout();

    dispatch({ isLoading: false, user: null });

    window.router.go(Views.Cover);
  } catch (err) {
    console.error(err);
  }
};

export const signIn: DispatchStateHandler<SignInPayload> = async (
  dispatch,
  _state,
  action
) => {
  try {
    dispatch({ isLoading: true });

    const response = await AuthAPI.signIn(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, signInFormError: response.reason });
      return;
    }

    const responseUser = await AuthAPI.me();

    dispatch({ isLoading: false, signInFormError: null });

    if (apiHasError(response)) {
      dispatch(logout);
      return;
    }

    dispatch({ user: transformUser(responseUser as UserDTO) });

    window.router.go(Views.Messenger);
  } catch (err) {
    console.error(err);
  }
};

export const signUp: DispatchStateHandler<SignUpPayload> = async (
  dispatch,
  _state,
  action
) => {
  try {
    dispatch({ isLoading: true });

    const { password2: _password2, ...signUpPayload } = action;
    const response = await AuthAPI.signUp(signUpPayload);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, signUpFormError: response.reason });
      return;
    }

    const responseUser = await AuthAPI.me();

    dispatch({ isLoading: false, signUpFormError: "" });

    if (apiHasError(responseUser)) {
      dispatch(logout);
      return;
    }

    dispatch({ user: transformUser(responseUser) });

    window.router.go(Views.Messenger);
  } catch (err) {
    console.error(err);
  }
};
