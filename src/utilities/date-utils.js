function getWeek() {
  const now = new Date(); // setting the date
  const currentDay = now.getDay(); // gets the current day e.g., Sunday represents 0

  // Calculate the start of the week accounting for if the day is Sunday
  const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1;
  const startOfWeek = new Date(now);
  // Monday starts from
  startOfWeek.setDate(now.getDate() - daysUntilMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  // Calculate the end of the week accounting for if the day is Sunday
  const daysUntilSunday = currentDay === 0 ? 0 : 7 - currentDay;
  const endOfWeek = new Date(now);
  // Sunday ends at
  endOfWeek.setDate(now.getDate() + daysUntilSunday);
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
}

export function getFormattedDateRange() {
  const { startOfWeek, endOfWeek } = getWeek();
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const dateTimeFormat = new Intl.DateTimeFormat('en', options);
  const formattedStartDate = dateTimeFormat.format(startOfWeek);
  const formattedEndDate = dateTimeFormat.format(endOfWeek);
  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
  return formattedDateRange;
}
