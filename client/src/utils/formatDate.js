export const formatDate = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;

  const oneMinute = 1000 * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneYear = oneDay * 365;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (diffMs > oneDay) {
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    if (diffMs > oneYear) {
      const year = date.getFullYear().toString();
      return `${monthNames[month]} ${day}, ${year}`;
    }
    return `${monthNames[month]} ${day}`;
  } else if (diffMs > oneHour) {
    const hours = Math.floor(diffMs / oneHour);
    return `${hours}h`;
  } else if (diffMs > oneMinute) {
    const minutes = Math.floor(diffMs / oneMinute);
    return `${minutes}m`;
  } else {
    const seconds = Math.floor(diffMs / 1000);
    return `${seconds}s`;
  }
};

export const formatDateFull = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${monthNames[month]} ${day}, ${year} · ${hours}:${minutes} `;
};

export const formatDateSimple = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

export const formatTimeSimple = (date) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
