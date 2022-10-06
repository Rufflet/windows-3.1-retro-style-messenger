import { Block, Validator } from "core";
import "../profile.css";
import { ProfilePageProps } from "../profile";

export class ProfileEditPage extends Block {
  constructor({ avatar, ...props }: ProfilePageProps) {
    console.log("edit", props);
    const defaultValues = {
      values: {
        login: "",
        email: "",
        first_name: "",
        second_name: "",
        display_name: "",
        phone: "",
      },
      errors: {
        login: "",
        email: "",
        first_name: "",
        second_name: "",
        display_name: "",
        phone: "",
      },
    };

    defaultValues.values = { ...defaultValues.values, ...props };

    super({ ...defaultValues, avatar });
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
    const { avatar, errors, values } = this.state;

    // language=hbs
    return `
      {{#Layout class="profile-page" }}
        {{#WindowLayout title="Изменить данные профиля" }}
          <div class="profile-page__avatar">
            <img src="${avatar}" alt="avatar">
          </div>
        
          <h3 class="profile-page__title">${values.first_name} ${values.second_name}</h3>

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
              label="Имя в чате:"
              id="display_name"
              name="display_name"
              value="${values.display_name}"
              error="${errors.display_name}"
              type="text"
              ref="display_name"
              placeholder="Введите имя в чате"
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
        
            {{{Button text="Сохранить" onClick=onSubmit}}}
          </form>
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}
