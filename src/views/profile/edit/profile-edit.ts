import { Block, Dispatch, Router, validate, Validator } from "core";
import { withRouter, withStore } from "utils";
import { changeAvatar, changeUserData } from "services/profile";

import "../profile.css";

export interface ProfileEditPageProps {
  router: Router;
  dispatch: Dispatch<AppState>;
  user: Nullable<User>;
  profileEditFormError: Nullable<string>;
}

export class ProfileEditPage extends Block<ProfileEditPageProps> {
  static componentName = "ProfileEditPage";

  protected getStateFromProps(props: any) {
    const { avatar, id: _id, ...values } = props.user;
    this.state = {
      values,
      errors: {
        login: "",
        email: "",
        first_name: "",
        second_name: "",
        display_name: "",
        phone: "",
      },
      avatar,
      onSubmit: this.onSubmit.bind(this),
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
      onAvatarChange: this.handleAvatarChange.bind(this),
      goBack: () => this.props.router.back(),
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
      console.log("action/profile-edit", this.state.values);
      this.props.dispatch(changeUserData, this.state.values);
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

  handleAvatarChange() {
    const avatarFromElement = document.querySelector(
      "form.avatar"
    ) as HTMLFormElement;

    if (avatarFromElement) {
      const formData = new FormData(
        document.querySelector("form.avatar") as HTMLFormElement
      );

      this.props.dispatch(changeAvatar, formData);
    }
  }

  render() {
    const { avatar, errors, values } = this.state;

    // language=hbs
    return `
      {{#Layout class="profile-page" }}
        {{#WindowLayout title="Изменить данные профиля" }}
          <div class="profile-page__avatar">
            {{{Avatar imgUrl="${avatar}" onChange=onAvatarChange}}}
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
            {{{ErrorComponent text=profileEditFormError}}}

            <div class="align-center">
              {{{Button text="Сохранить" onClick=onSubmit}}}
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
    profileEditFormError: state.profileEditFormError,
  };
}

export default withRouter(withStore(ProfileEditPage, mapStateToProps));
