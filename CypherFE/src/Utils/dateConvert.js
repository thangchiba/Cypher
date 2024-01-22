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

export function formatDateToCustomString(dateParam) {
  let date;
  if (dateParam instanceof Date) {
    date = dateParam;
  } else {
    date = new Date(dateParam);
  }
  const pad = (num) => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-indexed in JavaScript
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isToday = year === today.getFullYear() && month === pad(today.getMonth() + 1) && day === pad(today.getDate());
  const isYesterday = year === yesterday.getFullYear() && month === pad(yesterday.getMonth() + 1) && day === pad(yesterday.getDate());

  let dateString;
  if (isToday) {
    dateString = 'Today';
  } else if (isYesterday) {
    dateString = 'Yesterday';
  } else {
    dateString = `${year}-${month}-${day}`;
  }

  return `${dateString} ${hours}:${minutes}:${seconds}`;
}
