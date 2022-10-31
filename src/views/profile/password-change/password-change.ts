import { Block, Dispatch, Router, validate, Validator } from "core";
import { withRouter, withStore } from "utils";
import { changePassword } from "services/profile";

import "../profile.css";

export interface PasswordChangePageProps {
  router: Router;
  dispatch: Dispatch<AppState>;
  passwordChangeFormError: Nullable<string>;
}

export class PasswordChangePage extends Block<PasswordChangePageProps> {
  static componentName = "PasswordChangePage";

  protected getStateFromProps() {
    this.state = {
      values: {
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
      },
      errors: {
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
      },
      onSubmit: this.onSubmit.bind(this),
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
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
      console.log("action/password-change", this.state.values);
      const data = {
        oldPassword: this.state.values.oldPassword,
        newPassword: this.state.values.newPassword,
      };
      this.props.dispatch(changePassword, data);
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
          {{#Form class="form aligned" onSubmit=onSubmit}}
            {{{ControlledInput
              label="Старый пароль:"
              id="oldPassword"
              name="oldPassword"
              value="${values.oldPassword}"
              error="${errors.oldPassword}"
              type="password"
              ref="oldPassword"
              placeholder="Старый пароль"
              onFocus=onFocus
              onBlur=onBlur
            }}}

            {{{ControlledInput
              label="Новый пароль:"
              id="newPassword"
              name="newPassword"
              value="${values.newPassword}"
              error="${errors.newPassword}"
              type="password"
              ref="newPassword"
              placeholder="Новый пароль"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{ControlledInput
              label="Повторите новый пароль:"
              id="newPassword2"
              name="newPassword2"
              value="${values.newPassword2}"
              error="${errors.newPassword2}"
              type="password"
              ref="newPassword2"
              placeholder="Повторите новый пароль"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{ErrorComponent text=passwordChangeFormError}}}

            <div class="align-center">
              {{{Button text="Сохранить" type="submit"}}}
              {{{Button text="Назад" onClick=goBack}}}
            </div>
          {{/Form}}
        {{/WindowLayout}}
      {{/Layout}}
    `;
  }
}

function mapStateToProps(state: AppState) {
  return {
    passwordChangeFormError: state.passwordChangeFormError,
  };
}

export default withRouter(withStore(PasswordChangePage, mapStateToProps));
