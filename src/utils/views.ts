import { BlockClass } from "core";
import CoverPage from "views/cover";
import SignInPage from "views/signIn";
import SignUpPage from "views/signUp";
import {
  ProfilePage,
  ProfileEditPage,
  PasswordChangePage,
} from "views/profile";
import MessengerPage from "views/messenger";
import { Error404Page, Error500Page } from "views/errors";

export enum Views {
  Cover = "/cover",
  SignIn = "/signin",
  SignUp = "/signup",
  Profile = "/profile",
  ProfileEdit = "/profile/edit",
  PasswordChange = "/profile/password-change",
  Messenger = "/messenger",
  Error404 = "/error/404",
  Error500 = "/error/500",
}

const map: Record<Views, BlockClass<any>> = {
  [Views.Cover]: CoverPage,
  [Views.SignIn]: SignInPage,
  [Views.SignUp]: SignUpPage,
  [Views.Profile]: ProfilePage,
  [Views.ProfileEdit]: ProfileEditPage,
  [Views.PasswordChange]: PasswordChangePage,
  [Views.Messenger]: MessengerPage,
  [Views.Error404]: Error404Page,
  [Views.Error500]: Error500Page,
};

export const getScreenComponent = (view: Views): BlockClass<any> => {
  return map[view];
};
