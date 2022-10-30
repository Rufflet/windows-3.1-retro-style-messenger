export function dateTransformer(time: string) {
  const date = new Date(time);
  const currentDate = new Date(Date.now());
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const diffTime = Math.abs(currentDate.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  switch (diffDays) {
    case 0:
      return `${hours}:${minutes}`;
    case 1:
      return `вчера`;
    default:
      return `${Number(currentDate.toString().slice(8, 10))} ${
        months[currentDate.getMonth()]
      }`;
  }
}
