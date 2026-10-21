function pad(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

// US short date, month first: 8/24/95. Two-digit year keeps the chat list narrow.
export function dateTransformer(time: string) {
  const date = new Date(time);
  const now = new Date();

  if (isSameDay(date, now)) {
    return `${date.getHours()}:${pad(date.getMinutes())}`;
  }

  const year = date.getFullYear() % 100;
  return `${date.getMonth() + 1}/${date.getDate()}/${pad(year)}`;
}
