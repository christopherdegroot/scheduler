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

    const dayOfWeek = findDay(state.day);

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek],
    };

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1,
      };
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots,
      };
    }

    let days = state.days;
    days[dayOfWeek] = day;

    const putURL = `/api/appointments/${id}`;
    return axios
      .put(putURL, { interview })
      .then((res) => setState({ ...state, appointments, days }));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayOfWeek = findDay(state.day);

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1,
    };

    let days = state.days;
    days[dayOfWeek] = day;

    const deleteURL = `/api/appointments/${id}`;
    return axios.delete(deleteURL).then((res) => {
      setState({ ...state, appointments, days });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
