import Block from "core/Block";
import errorPic from "assets/err.png";

import "./error.css";

export class Error500Page extends Block {
  // language=hbs
  render() {
    return `
      {{#Layout class="error-page" }}
        {{#WindowLayout title="Application Error" }}
          <div class="error-message">
            <div class="error-message__image">
              <img src="${errorPic}" alt="500">
            </div>
            <div class="error-message__text">
              <p>Ошибка 500</p>
              <p>«Internal Server Error»</p>
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
