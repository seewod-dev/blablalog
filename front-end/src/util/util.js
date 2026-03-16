export function parseDate(dateStr) {
  const date = new Date(dateStr);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}