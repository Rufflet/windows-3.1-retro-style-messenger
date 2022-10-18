import Block from "core/Block";
import warnPic from "assets/warn.png";

import "./error.css";

export class Error404Page extends Block {
  render() {
    // language=hbs
    return `
      {{#Layout class="error-page" }}
        {{#WindowLayout title="Application Error" }}
          <div class="error-message">
            <div class="error-message__image">
              <img src="${warnPic}" alt="404">
            </div>
            <div class="error-message__text">
              <p>Ошибка 404</p>
              <p>«Не найдено»</p>
            </div>
          </div>
          <div class="align-center">
            <a class="button" href="/">Назад</a>
          </div>
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}
