// filtering nanny avails for nanny card
export function filterNannyAvailability(nanny) {
  let nannyAvaibilityFiltered = Object.entries(nanny.weeklyAvailability) // converts to nested array
    .filter(([day, available]) => available && day.includes('day')) // filters out non-day keys and false values
    .reduce((filteredList, day) => filteredList.concat(day[0]), []); // converts to array of days
  return nannyAvaibilityFiltered;
}