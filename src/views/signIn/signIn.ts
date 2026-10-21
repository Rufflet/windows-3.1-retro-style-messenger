import { Router, Dispatch, Block } from "core";
import { withStore, withRouter } from "utils";
import { DEMO_LOGIN } from "mock/seed";
import { signIn } from "services/auth";
import { Views } from "utils/views";

import "./signin.css";

interface SignInPageProps {
  router: Router;
  dispatch: Dispatch<AppState>;
  signInFormError: Nullable<string>;
}

export class SignInPage extends Block<SignInPageProps> {
  static componentName = "SignInPage";

  protected getStateFromProps(props: TemplateProps) {
    this.state = {
      onSubmit: this.onSubmit.bind(this),
      goSignUp: () => this.props.router.go(Views.SignUp),
      ...props,
    };
  }

  onSubmit(e: Event) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    this.props.dispatch(signIn, {
      login: String(data.get("login") || ""),
      password: String(data.get("password") || ""),
    });
  }

  componentDidMount() {
    if (window.store.getState().user) this.props.router.go("/messenger");
  }

  render() {
    // language=hbs
    return `
      {{#Layout name="Login" class="signin-page" }}
        {{#WindowLayout title="Sign in" }}
          {{#Form class="form aligned" onSubmit=onSubmit}}
            <p class="form-hint">Demo account: <b>${DEMO_LOGIN.login}</b> / <b>${DEMO_LOGIN.password}</b>. You can also sign in with any account you registered in this browser.</p>
            {{{ControlledInput
              label="Login:"
              id="login"
              name="login"
              type="text"
              placeholder="Enter login"
            }}}

            {{{ControlledInput
              label="Password:"
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
            }}}
            {{{ErrorComponent text=signInFormError}}}

            {{{Button text="Sign in" type="submit"}}}
            {{{Link text="No account?" onClick=goSignUp}}}
          {{/Form}}
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}

function mapStateToProps(state: AppState) {
  return {
    signInFormError: state.signInFormError,
  };
}

export default withRouter(withStore(SignInPage, mapStateToProps));
