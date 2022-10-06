import { Block, Validator } from "core";
import "./signin.css";

interface SignInPageProps {
  login?: string;
  password?: string;
}

export class SignInPage extends Block {
  constructor(props: SignInPageProps) {
    const defaultValues = {
      values: {
        login: "",
        password: "",
      },
      errors: {
        login: "",
        password: "",
      },
    };

    defaultValues.values = { ...defaultValues.values, ...props };

    super({
      ...defaultValues,
    });
  }

  protected getStateFromProps(props: TemplateProps) {
    this.state = {
      onSubmit: this.onSubmit.bind(this),
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
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
    let isValid = true;
    const newValues = { ...this.props.values };
    const newErrors = { ...this.props.errors };

    Object.keys(this.props.values).forEach((key) => {
      newValues[key] = (
        this.refs[key].getContent().querySelector("input") as HTMLInputElement
      ).value;

      const message = Validator(key, newValues[key]);
      if (message) {
        isValid = false;
        newErrors[key] = message;
      }
    });

    const newState = {
      values: newValues,
      errors: newErrors,
    };

    this.setState(newState);

    return isValid;
  }

  onSubmit() {
    if (this.isFormValid()) {
      console.log("action/signIn", this.state.values);
    }
  }

  render() {
    const { errors, values } = this.state;

    // language=hbs
    return `
      {{#Layout name="Login" class="signin-page" }}
        {{#WindowLayout title="Вход" }}
          <form class="form aligned">
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
        
            {{{Button text="Авторизоваться" onClick=onSubmit}}}
            <a href="/signup">Нет аккаунта?</a>
          </form>
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}
