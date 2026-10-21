import { Block, Dispatch, Router, validate, Validator } from "core";
import { withRouter, withStore } from "utils";
import { Views } from "utils/views";
import { signUp } from "services/auth";
import { formatNationalNumber, getCountry, toInternational } from "utils/phone";

import "./signup.css";

interface SignUpPageProps {
  router: Router;
  dispatch: Dispatch<AppState>;
  signUpFormError: Nullable<string>;
}

export class SignUpPage extends Block<SignUpPageProps> {
  static componentName = "SignUpPage";

  private countryIso = "US";

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
      onPhoneInput: this.onPhoneInput.bind(this),
      onCountryChange: this.onCountryChange.bind(this),
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

  onSubmit(e: Event) {
    e.preventDefault();

    if (!this.isFormValid()) {
      return;
    }

    const { values } = this.state;
    this.props.dispatch(signUp, {
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

  render() {
    const { errors, values } = this.state;
    const country = getCountry(this.countryIso);

    // language=hbs
    return `
      {{#Layout class="signup-page" }}
        {{#WindowLayout title="Sign up" }}
          {{#Form class="form aligned" onSubmit=onSubmit}}
            <p class="form-hint">Use any login and password. Password: 8–40 characters, one capital letter and one digit. The account is saved only in this browser.</p>
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

            {{{ControlledInput
              label="Password:"
              id="password"
              name="password"
              value="${values.password}"
              error="${errors.password}"
              type="password"
              ref="password"
              placeholder="Enter password"
              onFocus=onFocus
              onBlur=onBlur
            }}}

            {{{ControlledInput
              label="Password again:"
              id="password2"
              name="password2"
              value="${values.password2}"
              error="${errors.password2}"
              type="password"
              ref="password2"
              placeholder="Enter password again"
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{ErrorComponent text=signUpFormError}}}
        
            {{{Button text="Sign up" type="submit"}}}
            {{{Link text="Sign in" onClick=goSignIn}}}
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
