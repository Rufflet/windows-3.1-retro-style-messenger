import { Block, Validator } from "core";
import "../profile.css";

export class PasswordChangePage extends Block {
  constructor() {
    const defaultValues = {
      values: {
        password: "",
        password2: "",
        newpassword: "",
      },
      errors: {
        password: "",
        password2: "",
        newpassword: "",
      },
    };
    super({
      ...defaultValues,
    });
  }

  protected getStateFromProps(props: any) {
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
    if (this.isFormValid()) {
      console.log("action/profile-edit", this.state.values);
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
      {{#Layout class="profile-page" }}
        {{#WindowLayout title="Изменить пароль" }}
          <form class="form aligned">
            {{{ControlledInput
              label="Старый пароль:"
              id="password"
              name="password"
              value="${values.password}"
              error="${errors.password}"
              type="password"
              ref="password"
              placeholder="Старый пароль"
              onFocus=onFocus
              onBlur=onBlur
            }}}

            {{{ControlledInput
              label="Новый пароль:"
              id="password2"
              name="password2"
              value="${values.password2}"
              error="${errors.password2}"
              type="password"
              ref="password2"
              placeholder="Новый пароль"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{ControlledInput
              label="Повторите новый пароль:"
              id="newpassword"
              name="newpassword"
              value="${values.newpassword}"
              error="${errors.newpassword}"
              type="password"
              ref="newpassword"
              placeholder="Повторите новый пароль"
              onFocus=onFocus
              onBlur=onBlur
            }}}

            {{{Button text="Сохранить" onClick=onSubmit}}}
          </form>
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}
