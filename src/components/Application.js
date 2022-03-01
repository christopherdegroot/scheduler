import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"

export default function Application(props) {
  // setting state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // side effect for setting state axios get request then setting state with a promise.all
  useEffect(()=>{
    const daysUrl = "/api/days"
    const interviewersUrl = "/api/interviewers"
    const appointmentsUrl = "/api/appointments"
    Promise.all([
      axios.get(daysUrl),
      axios.get(interviewersUrl),
      axios.get(appointmentsUrl)
    ]).then((all) => {
      const [days, interviewers, appointments] = all;
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
    })
  }, [])

  // get interviewers for day to pass to appointment
  const interviewersForDay = getInterviewersForDay(state, state.day)

  // book an interview function
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log('logging interview', interview)

    const putURL = `/api/appointments/${id}`
    return axios
      .put(putURL, {interview})
      .then(res=>setState({...state, appointments}))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const deleteURL = `/api/appointments/${id}`
    return axios.delete(deleteURL)
    .then((res) => {
        setState({...state, appointments})
        console.log('set state finished')
      })
    // setState({...state, appointments})
  }


  // declaring setDay function
  const setDay = day => setState({ ...state, day:day });
  
  // get the daily appointments
  const dailyAppointments = getAppointmentsForDay(state, state.day)


  console.log('logging dailyAppointments in Application', dailyAppointments);
  //parse daily appointments to get the interviews for that day, then set the appointments for that day with the return data
  const parsedAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)

      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={interview}
          interviewers={interviewersForDay}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
  });
    
    
  // return portion of component: decides layout and state passed to children  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
