import { Block, Router } from "core";
import { Views, withRouter } from "utils";
import signInPic from "assets/start-page/signin.png";
import signUpPic from "assets/start-page/signup.png";
import messengerPic from "assets/start-page/messenger.png";
import profilePic from "assets/start-page/profile.png";
import error404pic from "assets/start-page/404.png";
import error500pic from "assets/start-page/500.png";
import "./cover.css";

export interface CoverPagePageProps {
  router: Router;
}

export class CoverPage extends Block<CoverPagePageProps> {
  static componentName = "CoverPage";

  protected getStateFromProps() {
    this.state = {
      goSignIn: () => this.props.router.go(Views.SignIn),
      goSignUp: () => this.props.router.go(Views.SignUp),
      goMessenger: () => this.props.router.go(Views.Messenger),
      goProfile: () => this.props.router.go(Views.Profile),
      goError404: () => this.props.router.go(Views.Error404),
      goError500: () => this.props.router.go(Views.Error500),
    };
  }

  // language=hbs
  render() {
    return `
      {{#Layout name="Onboarding" class="start-page" }}
        {{#WindowLayout title="Панель управления" }}
          {{{ StartIcon text="Авторизация" img="${signInPic}" onClick=goSignIn}}}
          {{{ StartIcon text="Регистрация" img="${signUpPic}" onClick=goSignUp}}}
          {{{ StartIcon text="Мессенджер" img="${messengerPic}" onClick=goMessenger}}}
          {{{ StartIcon text="Профиль" img="${profilePic}" onClick=goProfile}}}
          {{{ StartIcon text="404" img="${error404pic}" onClick=goError404}}}
          {{{ StartIcon text="500" img="${error500pic}" onClick=goError500}}}
        {{/WindowLayout}}
      {{/Layout}}
      `;
  }
}

export default withRouter(CoverPage);
