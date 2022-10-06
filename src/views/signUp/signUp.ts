import { Block, Validator } from "core";
import "./signup.css";

interface SignUpPageProps {
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  phone?: string;
  password?: string;
  password2?: string;
}

export class SignUpPage extends Block {
  constructor(props: SignUpPageProps) {
    const defaultValues = {
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
    console.log(this.props);
    console.log(this.state);

    if (this.isFormValid()) {
      console.log("action/signUp", this.state.values);
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
          <form class="form aligned">
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
        
            {{{Button text="Зарегистрироваться" onClick=onSubmit}}}
            <a href="/signin">Войти</a>
          </form>
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}
