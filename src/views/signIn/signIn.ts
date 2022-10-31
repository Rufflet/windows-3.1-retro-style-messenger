import { Router, Dispatch, Block, Validator, validate } from "core";
import { withStore, withRouter } from "utils";
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
      values: {
        login: "",
        password: "",
      },
      errors: {
        login: "",
        password: "",
      },
      onSubmit: this.onSubmit.bind(this),
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
      goSignUp: () => this.props.router.go(Views.SignUp),
      ...props,
    };
  }

  onFocus(e: Event) {
    const input = e.target as HTMLInputElement;
    const { value, name } = input;

    const errorText = Validator(name, value);
    this.refs[name].refs.errorRef.setProps({ text: errorText });
  }

  onBlur(e: Event) {
    const input = e.target as HTMLInputElement;
    const { value, name } = input;

    const errorText = Validator(name, value);
    this.refs[name].refs.errorRef.setProps({ text: errorText });
  }

  isFormValid() {
    const { newState, isValid } = validate(
      this.state.values,
      this.state.errors,
      this
    );

    this.setState(newState);
    return isValid;
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (this.isFormValid()) {
      console.log("action/signIn", this.state.values);
      this.props.dispatch(signIn, this.state.values);
    }
  }

  componentDidMount() {
    if (window.store.getState().user) this.props.router.go("/messenger");
  }

  render() {
    const { errors, values } = this.state;

    // language=hbs
    return `
      {{#Layout name="Login" class="signin-page" }}
        {{#WindowLayout title="Вход" }}
          {{#Form class="form aligned" onSubmit=onSubmit}}
            {{{ControlledInput
              label="Логин:"
              id="login"
              name="login"
              value="${values.login}"
              error="${errors.login}"
              type="text"
              ref="login"
              placeholder="Введите логин"
              onFocus=onFocus
              onBlur=onBlur
            }}}

            {{{ControlledInput
              label="Пароль:"
              id="password"
              name="password"
              value="${values.password}"
              error="${errors.password}"
              type="password"
              ref="password"
              placeholder="Введите пароль"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{ErrorComponent text=signInFormError}}}

            {{{Button text="Авторизоваться" type="submit"}}}
            {{{Link text="Нет аккаунта?" onClick=goSignUp}}}
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
