import { Block, Router } from "core";
import { withRouter } from "utils";
import warnPic from "assets/warn.png";

import "./error.css";

interface Error404PageProps {
  router: Router;
}

export class Error404Page extends Block<Error404PageProps> {
  protected getStateFromProps() {
    this.state = {
      goBack: () => this.props.router.back(),
    };
  }

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
            {{{Button text="Назад" onClick=goBack}}}
          </div>
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}

export default withRouter(Error404Page);
