import { Block } from "core";
import "./profile.css";

export interface ProfilePageProps {
  avatar?: string;
  login: string;
  email: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

export class ProfilePage extends Block {
  constructor({ avatar, ...props }: ProfilePageProps) {
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
    this.state = { ...props };
  }

  render() {
    const { avatar, values } = this.state;

    // language=hbs
    return `
      {{#Layout class="profile-page" }}
        {{#WindowLayout title="Профиль" }}
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
              type="text"
              attrs="readonly"
            }}}
            {{{ControlledInput
              label="Почта:"
              id="email"
              name="email"
              value="${values.email}"
              type="email"
              attrs="readonly"
            }}}
            {{{ControlledInput
              label="Имя:"
              id="first_name"
              name="first_name"
              value="${values.first_name}"
              type="text"
              attrs="readonly"
            }}}
            {{{ControlledInput
              label="Фамилия:"
              id="second_name"
              name="second_name"
              value="${values.second_name}"
              type="text"
              attrs="readonly"
            }}}
            {{{ControlledInput
              label="Имя в чате:"
              id="display_name"
              name="display_name"
              value="${values.display_name}"
              type="text"
              attrs="readonly"
            }}}
            {{{ControlledInput
              label="Телефон:"
              id="phone"
              name="phone"
              value="${values.phone}"
              type="tel"
              attrs="readonly"
            }}}
        
            <a href="/profile/edit">Изменить данные</a>
            <a href="/profile/password-change">Изменить пароль</a>
            <a class="button" href="/">Выйти</a>
          </form>
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}
