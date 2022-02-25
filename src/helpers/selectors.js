
// Get appointments for a day from state and day
export function getAppointmentsForDay(state, day) {
  
  // filter days, only grab days that match the day name given in function parameters
  const filteredDays = state.days.filter(days => days.name === day)
  if(state.days.length ===0 || filteredDays.length===0) return [];

  // get the appointments from the above filter
  const appointmentsFromDays = filteredDays[0].appointments;
  
  // create empty array to push to
  const filteredAppointments = [];

  // loop through appointments, push each state.appointment into the filter that matches the [appointment] key for each loop iteration
  for(const appointment of appointmentsFromDays) {
    filteredAppointments.push(state.appointments[appointment]);
  }
  return filteredAppointments;
}