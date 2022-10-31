import { Block, Dispatch, Router, validate, Validator } from "core";
import { withRouter, withStore } from "utils";
import { Views } from "utils/views";
import { signUp } from "services/auth";

import "./signup.css";

interface SignUpPageProps {
  router: Router;
  dispatch: Dispatch<AppState>;
  signUpFormError: Nullable<string>;
}

export class SignUpPage extends Block<SignUpPageProps> {
  static componentName = "SignUpPage";

  protected getStateFromProps(props: TemplateProps) {
    this.state = {
      values: {
        email: "",
        login: "",
        first_name: "",
        second_name: "",
        phone: "",
        password: "",
        password2: "",
      },
      errors: {
        email: "",
        login: "",
        first_name: "",
        second_name: "",
        phone: "",
        password: "",
        password2: "",
      },
      onSubmit: this.onSubmit.bind(this),
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
      goSignIn: () => this.props.router.go(Views.SignIn),
      ...props,
    };
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

  onSubmit() {
    if (this.isFormValid()) {
      console.log("action/signUp", this.state.values);
      this.props.dispatch(signUp, this.state.values);
    }
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

  render() {
    const { errors, values } = this.state;

    // language=hbs
    return `
      {{#Layout class="signup-page" }}
        {{#WindowLayout title="Регистрация" }}
          {{#Form class="form aligned" onSubmit=onSubmit}}
            {{{ControlledInput
              label="Почта:"
              id="email"
              name="email"
              value="${values.email}"
              error="${errors.email}"
              type="email"
              ref="email"
              placeholder="Введите email"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            
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
              label="Имя:"
              id="first_name"
              name="first_name"
              value="${values.first_name}"
              error="${errors.first_name}"
              type="text"
              ref="first_name"
              placeholder="Введите имя"
              onFocus=onFocus
              onBlur=onBlur
            }}}

            {{{ControlledInput
              label="Фамилия:"
              id="second_name"
              name="second_name"
              value="${values.second_name}"
              error="${errors.second_name}"
              type="text"
              ref="second_name"
              placeholder="Введите фамилию"
              onFocus=onFocus
              onBlur=onBlur
            }}}

            {{{ControlledInput
              label="Телефон:"
              id="phone"
              name="phone"
              value="${values.phone}"
              error="${errors.phone}"
              type="tel"
              ref="phone"
              placeholder="+71234567890"
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

            {{{ControlledInput
              label="Пароль ещё раз:"
              id="password2"
              name="password2"
              value="${values.password2}"
              error="${errors.password2}"
              type="password"
              ref="password2"
              placeholder="Введите пароль ещё раз"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{ErrorComponent text=signUpFormError}}}
        
            {{{Button text="Зарегистрироваться" type="submit"}}}
            {{{Link text="Войти" onClick=goSignIn}}}
          {{/Form}}
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}

function mapStateToProps(state: AppState) {
  return {
    signUpFormError: state.signUpFormError,
  };
}

export default withRouter(withStore(SignUpPage, mapStateToProps));
