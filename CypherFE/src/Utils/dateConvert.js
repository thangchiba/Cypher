export function formatDateToDateTimeString(date) {
  const pad = (num) => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-indexed in JavaScript
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDateToCustomString(date) {
  const pad = (num) => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-indexed in JavaScript
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const today = new Date();
  const isToday = year === today.getFullYear() && month === pad(today.getMonth() + 1) && day === pad(today.getDate());

  const dateString = isToday ? 'Today' : `${year}-${month}-${day}`;
  return `${dateString} ${hours}:${minutes}:${seconds}`;
}
