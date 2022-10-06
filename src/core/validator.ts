export default function Validator(name: string, value: string): string {
  const errors = [];
  switch (name) {
    case "login":
      if (!(value.length >= 3 && value.length <= 20)) {
        errors.push("Используйте от 3 до 20 символов");
      }
      if (!/[\D]/.test(value)) {
        errors.push("Не используйте только цифры");
      }
      if (/[^\-\w]/.test(value)) {
        errors.push(
          "Не используйте кириллицу, пробелы и спецсимволы (кроме - и _)"
        );
      }
      break;
    case "email":
      if (!/^[\w+-]+(\.[\w+-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)) {
        errors.push("Не верный формат e-mail");
      }
      break;
    case "password":
    case "password2":
    case "newpassword":
      if (!(value.length >= 8 && value.length <= 40)) {
        errors.push("Используйте от 8 до 40 символов");
      }
      if (!/[A-Z,А-Я]/.test(value)) {
        errors.push("Обязательна хотя бы одна заглавная буква");
      }
      if (!/\d/.test(value)) {
        errors.push("Обязательна хотя бы одна цифра");
      }
      break;
    case "first_name":
    case "second_name":
      if (!/^[A-Z, А-Я]/.test(value)) {
        errors.push("Первая буква должна быть заглавной");
      }
      if (/[^\-,A-Z,a-z,А-Я,а-я]/.test(value) || /[\d]/.test(value)) {
        errors.push("Не используйте спецсимволы, пробелы и цифры");
      }
      break;
    case "phone":
      if (!(value.length >= 10 && value.length <= 15)) {
        errors.push("Используйте от 10 до 15 символов");
      }
      if (!/^[+]?\d+$/.test(value)) {
        errors.push("Не используйте недопустимые символыф");
      }
      break;
    case "message":
      if (!value) {
        errors.push("Поле не может быть пустым");
      }
      break;
    default:
      return "";
  }
  return errors.join("<br>");
}
