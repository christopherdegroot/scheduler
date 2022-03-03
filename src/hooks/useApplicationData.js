import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // setting state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // declaring setDay function
  const setDay = (day) => setState({ ...state, day: day });

  // side effect for setting state axios get request then setting state with a promise.all
  useEffect(() => {
    const daysUrl = "/api/days";
    const interviewersUrl = "/api/interviewers";
    const appointmentsUrl = "/api/appointments";
    Promise.all([
      axios.get(daysUrl),
      axios.get(interviewersUrl),
      axios.get(appointmentsUrl),
    ]).then((all) => {
      const [days, interviewers, appointments] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  // function to find day ID based on day name to be used to update spots
  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    return daysOfWeek[day];
  }

  // book an interview function
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // grab day ID based on day name
    const dayOfWeek = findDay(state.day);

    // create new day with updated spots
    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek],
    };

    // if interview is deleted, spots is reduced by one
    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1,
      };
    } else {
      // otherwise spots is updated to current value
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots,
      };
    }

    // created new days array to update and ensure not mutating state directly 
    let days = state.days;
    // update days array at the key of current day ID with updated day object
    days[dayOfWeek] = day;

    //axios put request to update state
    const putURL = `/api/appointments/${id}`;
    return axios
      .put(putURL, { interview })
      .then((res) => setState({ ...state, appointments, days }));
  }

  function cancelInterview(id) {
    // create new appointment object where interview is set to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // create new appointments object with spread appointments data, then update the key where id matches with above created appointment with interview set to null
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // find day ID based off state.day(day name)
    const dayOfWeek = findDay(state.day);

    // updates day with +1 to value of spots when an interview is cancelled
    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1,
    };
    
     // created new days array to update and ensure not mutating state directly 
    let days = state.days;
     // update days array at the key of current day ID with updated day object
    days[dayOfWeek] = day;

    // axios delete request to delete interview
    const deleteURL = `/api/appointments/${id}`;
    return axios.delete(deleteURL).then((res) => {
      setState({ ...state, appointments, days });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
