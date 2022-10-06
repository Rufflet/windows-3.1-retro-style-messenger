// require("babel-core/register");
import ChatListItem from "components/chatListItem";
import Chat from "components/chat";
import Textarea from "components/textarea";
import ErrorComponent from "components/error";
import StartIcon from "./components/startIcon";
import Button from "./components/button";
import ControlledInput from "./components/controlledInput";
import Input from "./components/input";
import Layout from "./components/layout";
import WindowLayout from "./components/windowLayout";

import CoverPage from "./views/cover";
import SignInPage from "./views/signIn";
import SignUpPage from "./views/signUp";
import {
  ProfilePage,
  ProfileEditPage,
  PasswordChangePage,
} from "./views/profile";
import { Error404Page, Error500Page } from "./views/errors";
import MessengerPage from "./views/messenger";

import "./style/main.css";

import { renderDOM, registerComponent } from "./core";
import { profile, chatList, chat, signIn, signUp } from "./data/dataset";

registerComponent(StartIcon);
registerComponent(Button);
registerComponent(ControlledInput);
registerComponent(Input);
registerComponent(Textarea);
registerComponent(ErrorComponent);
registerComponent(ChatListItem);
registerComponent(Chat);
registerComponent(Layout);
registerComponent(WindowLayout);

document.addEventListener("DOMContentLoaded", () => {
  switch (window.location.pathname) {
    case "":
    case "/":
      renderDOM(new CoverPage());
      break;
    case "/signin":
      renderDOM(new SignInPage(signIn));
      break;
    case "/signup":
      renderDOM(new SignUpPage(signUp));
      break;
    case "/profile":
      renderDOM(new ProfilePage(profile));
      break;
    case "/profile/edit":
      renderDOM(new ProfileEditPage(profile));
      break;
    case "/profile/password-change":
      renderDOM(new PasswordChangePage());
      break;
    case "/messenger":
      renderDOM(new MessengerPage({ ...chatList, ...chat }));
      break;
    case "/404":
      renderDOM(new Error404Page());
      break;
    case "/500":
      renderDOM(new Error500Page());
      break;
    default:
      renderDOM(new Error404Page());
  }
});
