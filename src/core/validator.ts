import Block from "core/Block";

const RULES: Record<string, RegExp> = {
  login: /^[a-zA-Z0-9-_]{3,20}$/,
  password: /^(?=.*?[A-Z])(?=.*?[0-9]).{8,40}$/,
  display_name: /^.+$/,
  only_digits: /\D/,
  cyrillic_spaces_symbols: /[^\-\w]/,
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  first_letter_capital: /^[A-Z]/,
  symbols: /[^A-Za-z-]/,
  empty_message: /^.+$/,
  contain_digits: /\d/,
};

const ERROR_MESSAGES: Record<string, string> = {
  login: "Use 3 to 20 characters",
  phone: "Enter 6 to 14 digits, without the country code",
  password: "Use 8–40 characters, at least one capital letter and one digit",
  only_digits: "Do not use digits only",
  cyrillic_spaces_symbols:
    "Use only Latin letters, digits, hyphen, and underscore",
  email: "Invalid e-mail format",
  first_letter_capital: "The first letter must be uppercase",
  symbols: "Do not use special characters",
  empty_message: "This field cannot be empty",
  contain_digits: "Do not use digits",
};

export function Validator(name: string, value: string): string {
  const errors = [];
  switch (name) {
    case "login":
      if (!RULES.only_digits.test(value)) {
        errors.push(ERROR_MESSAGES.only_digits);
      }
      if (RULES.cyrillic_spaces_symbols.test(value)) {
        errors.push(ERROR_MESSAGES.cyrillic_spaces_symbols);
      }
      if (!RULES.login.test(value)) {
        errors.push(ERROR_MESSAGES.login);
      }
      break;
    case "email":
      if (!RULES.email.test(value)) {
        errors.push(ERROR_MESSAGES.email);
      }
      break;
    case "password":
    case "password2":
    case "newpassword":
      if (!RULES.password.test(value)) {
        errors.push(ERROR_MESSAGES.password);
      }
      break;
    case "first_name":
    case "second_name":
      if (!RULES.first_letter_capital.test(value)) {
        errors.push(ERROR_MESSAGES.first_letter_capital);
      }
      if (RULES.symbols.test(value)) {
        errors.push(ERROR_MESSAGES.symbols);
      }
      if (RULES.contain_digits.test(value)) {
        errors.push(ERROR_MESSAGES.contain_digits);
      }
      break;
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 6 || digits.length > 14) {
        errors.push(ERROR_MESSAGES.phone);
      }
      break;
    }
    case "message":
    case "chatTitle":
      if (!RULES.empty_message.test(value)) {
        errors.push(ERROR_MESSAGES.empty_message);
      }
      break;
    default:
      return "";
  }
  return errors.join("<br>");
}

export function validate(
  values: Record<string, string>,
  errors: Record<string, string>,
  block: Block
) {
  let isValid = true;
  const newValues = { ...values };
  const newErrors = { ...errors };

  Object.keys(values).forEach((key) => {
    const refEl = block.refs[key].getContent();
    const refInputEl = refEl.querySelector(`[name=${key}]`) as HTMLInputElement;
    newValues[key] = refInputEl.value;

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

  return { newState, isValid };
}
