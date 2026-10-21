import { Block, Dispatch, Router, validate, Validator } from "core";
import { withRouter, withStore } from "utils";
import { changeAvatar, changeUserData } from "services/profile";
import {
  formatNationalNumber,
  getCountry,
  parsePhone,
  toInternational,
} from "utils/phone";

import "../profile.css";

export interface ProfileEditPageProps {
  router: Router;
  dispatch: Dispatch<AppState>;
  user: Nullable<User>;
  profileEditFormError: Nullable<string>;
}

export class ProfileEditPage extends Block<ProfileEditPageProps> {
  static componentName = "ProfileEditPage";

  private countryIso = "US";

  protected getStateFromProps(props: any) {
    const { avatar, id: _id, phone, ...values } = props.user;
    const parsed = parsePhone(phone || "");
    this.countryIso = parsed.iso;
    this.state = {
      values: {
        ...values,
        phone: parsed.national,
      },
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
      onPhoneInput: this.onPhoneInput.bind(this),
      onCountryChange: this.onCountryChange.bind(this),
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

  onSubmit(e: Event) {
    e.preventDefault();

    if (!this.isFormValid()) {
      return;
    }

    const { values } = this.state;
    this.props.dispatch(changeUserData, {
      ...values,
      phone: toInternational(this.countryIso, values.phone),
    });
  }

  onCountryChange(e: Event) {
    const iso = (e.target as HTMLSelectElement).value;
    this.countryIso = iso;
    const country = getCountry(iso);
    const dial = this.element?.querySelector("[data-phone-dial]");
    const input = this.element?.querySelector(
      "[name=phone]"
    ) as HTMLInputElement | null;

    if (dial) {
      dial.textContent = `+${country.dial}`;
    }
    if (input) {
      input.placeholder = country.example;
    }
  }

  onPhoneInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const formatted = formatNationalNumber(input.value);
    input.value = formatted;
    this.state.values.phone = formatted;
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
    const country = getCountry(this.countryIso);

    // language=hbs
    return `
      {{#Layout class="profile-page" }}
        {{#WindowLayout title="Edit profile" }}
          <div class="profile-page__avatar">
            {{{Avatar imgUrl="${avatar}" onChange=onAvatarChange}}}
          </div>
        
          <h3 class="profile-page__title">${values.first_name} ${values.second_name}</h3>

          {{#Form class="form aligned" onSubmit=onSubmit}}
            {{{ControlledInput
              label="Login:"
              id="login"
              name="login"
              value="${values.login}"
              error="${errors.login}"
              type="text"
              ref="login"
              placeholder="Enter login"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{ControlledInput
              label="Email:"
              id="email"
              name="email"
              value="${values.email}"
              error="${errors.email}"
              type="email"
              ref="email"
              placeholder="Enter email"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{ControlledInput
              label="First name:"
              id="first_name"
              name="first_name"
              value="${values.first_name}"
              error="${errors.first_name}"
              type="text"
              ref="first_name"
              placeholder="Enter first name"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{ControlledInput
              label="Last name:"
              id="second_name"
              name="second_name"
              value="${values.second_name}"
              error="${errors.second_name}"
              type="text"
              ref="second_name"
              placeholder="Enter last name"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{ControlledInput
              label="Display name:"
              id="display_name"
              name="display_name"
              value="${values.display_name}"
              error="${errors.display_name}"
              type="text"
              ref="display_name"
              placeholder="Enter display name"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            <div class="phone-line">
              <label class="controlled-input__label" for="country">Country:</label>
              {{{Select
                id="country"
                name="country"
                value="${this.countryIso}"
                onChange=onCountryChange
              }}}
            </div>
            <div class="phone-line">
              <span class="controlled-input__label">Phone:</span>
              <span class="phone-dial" data-phone-dial>+${country.dial}</span>
              {{{ControlledInput
                id="phone"
                name="phone"
                value="${values.phone}"
                error="${errors.phone}"
                type="tel"
                ref="phone"
                placeholder="${country.example}"
                onInput=onPhoneInput
                onFocus=onFocus
                onBlur=onBlur
              }}}
            </div>
            {{{ErrorComponent text=profileEditFormError}}}

            <div class="align-center">
              {{{Button text="Save" type="submit"}}}
              {{{Button text="Back" onClick=goBack}}}
            </div>
          {{/Form}}
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
