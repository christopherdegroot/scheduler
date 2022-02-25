import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "../helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  
  const setDay = day => setState({ ...state, day:day });
  
  
  
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  
  const parsedAppointments = dailyAppointments.map(appointment => 
    <Appointment
    key={appointment.id}
    {...appointment} 
    />)
    
    
    useEffect(()=>{
      const daysUrl = "/api/days"
      const interviewersUrl = "/api/interviewers"
      const appointmentsUrl = "/api/appointments"
      Promise.all([
        axios.get(daysUrl),
        axios.get(interviewersUrl),
        axios.get(appointmentsUrl)
      ]).then((all) => {
        const [days, interviews, appointments] = all;
        setState(prev => ({...prev, days: days.data, appointments: appointments.data}))
      })
    }, [])
    


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
