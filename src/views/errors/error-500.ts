import { Block, Router } from "core";
import { withRouter } from "utils";
import errorPic from "assets/err.png";

import "./error.css";

interface Error500PageProps {
  router: Router;
}

export class Error500Page extends Block<Error500PageProps> {
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
              <img src="${errorPic}" alt="500">
            </div>
            <div class="error-message__text">
              <p>Ошибка 500</p>
              <p>«Internal Server Error»</p>
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

export default withRouter(Error500Page);
