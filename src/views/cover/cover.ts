import Block from "core/Block";
import signInPic from "assets/start-page/signin.png";
import signUpPic from "assets/start-page/signup.png";
import messengerPic from "assets/start-page/messenger.png";
import profilePic from "assets/start-page/profile.png";
import error404pic from "assets/start-page/404.png";
import error500pic from "assets/start-page/500.png";

import "./cover.css";

export class CoverPage extends Block {
  // language=hbs
  render() {
    return `
        {{#Layout name="Onboarding" class="start-page" }}
          {{#WindowLayout title="Панель управления" }}
            {{{ StartIcon text="Авторизация" img="${signInPic}" href="/signin"}}}
            {{{ StartIcon text="Регистрация" img="${signUpPic}" href="/signup"}}}
            {{{ StartIcon text="Мессенджер" img="${messengerPic}" href="/messenger"}}}
            {{{ StartIcon text="Профиль" img="${profilePic}" href="/profile"}}}
            {{{ StartIcon text="404" img="${error404pic}" href="/404"}}}
            {{{ StartIcon text="500" img="${error500pic}" href="/500"}}}
          {{/WindowLayout}}
        {{/Layout}}
        `;
  }
}
