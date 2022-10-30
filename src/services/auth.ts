import AuthAPI from "api/auth";
import { UserDTO } from "api/types/auth";
import type { Dispatch } from "core";
import { transformUser, apiHasError } from "utils";
import { Views } from "../utils/views";
import type { SignInPayload, SignUpPayload } from "./types/auth";

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await AuthAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go("/cover");
};

export const signIn = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: SignInPayload
) => {
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

  window.router.go("/profile");
};

export const signUp = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: SignUpPayload
) => {
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

  window.router.go(Views.Profile);
};
