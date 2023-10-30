// filtering nanny avails for nanny card
export function filterNannyAvailability(nanny) {
  return Object.entries(nanny.weeklyAvailability) // converts to nested array
    .filter(([day, available]) => available && day.includes('day')) // filters out non-day keys and false values
    .reduce((filteredList, day) => filteredList.concat(day[0]), []); // converts to array of days
}

function sortTheDays(days) { // days is nested array

  const dayOrder = {  // custom sort order
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
    'Sunday': 7,
  };

  days.sort((a ,b) => {
    const dayA = a[0];
    const dayB = b[0];
    return dayOrder[dayA] - dayOrder[dayB]; // compares booking day keys to identify sorting value
    // negative is earlier in the week, positive larger is later in the week
  })

  return days

}

export function searchBookingAvailability(bookingData) {
  const days = Object.entries(bookingData).filter(([key]) => key.includes('day'))

  const orderDays = sortTheDays(days)

  return orderDays

}