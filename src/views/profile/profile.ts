import { Block, Dispatch, Router } from "core";
import { Views, withRouter, withStore } from "utils";
import { logout } from "services/auth";
import noAvatar from "assets/no-avatar.png";

import "./profile.css";

export interface ProfilePageProps {
  router: Router;
  dispatch: Dispatch<AppState>;
  user: Nullable<User>;
}

export class ProfilePage extends Block<ProfilePageProps> {
  static componentName = "ProfilePage";

  protected getStateFromProps(props: any) {
    const { avatar, ...values } = props.user;
    this.state = {
      avatar,
      values,
      goProfileEdit: () => this.props.router.go(Views.ProfileEdit),
      goChangePassword: () => this.props.router.go(Views.PasswordChange),
      goLogOut: () => this.props.dispatch(logout),
      goBack: () => this.props.router.back(),
    };
  }

  render() {
    const { values } = this.state;

    // language=hbs
    return `
      {{#Layout class="profile-page" }}
        {{#WindowLayout title="Профиль" }}
          <div class="profile-page__avatar">
            <picture>
              <source srcset="{{avatar}}" width="30" height="30">
              <img src="${noAvatar}" alt="avatar" width="30" height="30">
            </picture>
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

            {{{Link text="Изменить данные" onClick=goProfileEdit}}}
            {{{Link text="Изменить пароль" onClick=goChangePassword}}}

            <div class="align-center">
              {{{Button text="Выйти" onClick=goLogOut}}}
              {{{Button text="Назад" onClick=goBack}}}
            </div>
          </form>
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}

function mapStateToProps(state: AppState) {
  return {
    user: state.user,
  };
}

export default withRouter(withStore(ProfilePage, mapStateToProps));
