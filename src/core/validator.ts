import Block from "core/Block";

const RULES: Record<string, RegExp> = {
  login: /^[a-zA-Z0-9-_]{3,20}$/,
  phone: /^[+]?(\d+){10,14}$/,
  password: /^(?=.*?[A-ZА-Я])(?=.*?[0-9])(.){8,40}$/,
  display_name: /^.+$/,
  only_digits: /\D/,
  cyrillic_spaces_symbols: /[^\-\w]/,
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  first_letter_capital: /^[A-Z, А-Я]/,
  symbols: /[^\-,A-Z,a-z,А-Я,а-я,\d]/,
  empty_message: /^.+$/,
  contain_digits: /\d/,
};

const ERROR_MESSAGES: Record<string, string> = {
  login: "Используйте от 3 до 20 символов",
  phone:
    "Не используйте недопустимые символы<br>Используйте от 10 до 15 символов",
  password:
    "Используйте 8-40 символов,<br>хотя бы одну заглавную букву и цифру",
  only_digits: "Не используйте только цифры",
  cyrillic_spaces_symbols:
    "Не используйте кириллицу, пробелы и спецсимволы (кроме - и _)",
  email: "Не верный формат e-mail",
  first_letter_capital: "Первая буква должна быть заглавной",
  symbols: "Не используйте спецсимволы",
  empty_message: "Поле не может быть пустым",
  contain_digits: "Не используйте цифры",
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
    case "phone":
      if (!RULES.phone.test(value)) {
        errors.push(ERROR_MESSAGES.phone);
      }
      break;
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
