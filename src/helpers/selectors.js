
// Get appointments for a day from state and day
export function getAppointmentsForDay(state, day) {
  
  // filter days, only grab days that match the day name given in function parameters
  const dayObj = state.days.find(days => days.name === day)
  if(!dayObj) return [];
  
  // create empty array to push to
  const results = [];

  // loop through appointments, push each state.appointment into the filter that matches the [appointment] key for each loop iteration
  for(const id of dayObj.appointments) {
    results.push(state.appointments[id]);
  }
  return results;
}


//
// -----------------------------------------------------------------------------------------------------
//getInterview

export function getInterview(state, interview) {
  if (!interview) return null;
  // return null if interviews do not exist
 
  
  // pass it an object that contains the interviewer
  const filteredInterviews = {}
  filteredInterviews.student = interview.student
  filteredInterviews.interviewer = state.interviewers[interview.interviewer]
  
  // return a new object containing the interview data
  return filteredInterviews
}


//
//-----------------------------------------------------------------------------------------------------
// Get interviewers for a day from state and day
export function getInterviewersForDay(state, day) {
  
  const filteredDays = state.days.filter(days => days.name === day)
  if(state.days.length ===0 || filteredDays.length===0) return [];

  const interviewsFromDays = filteredDays[0].interviewers;

  const filteredInterviewers = [];

  for (const interviewId of interviewsFromDays) {
    filteredInterviewers.push(state.interviewers[interviewId])
  }
  return filteredInterviewers;
}
