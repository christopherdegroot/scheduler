import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


    // to pass to form component to capture the name and interviewer and pass them as props to create a new interview object
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props.bookInterview(props.id, interview)
        .then(res=>{
          transition(SHOW)
        })
    }
    console.log('Appointment = ',props.id, "props.interview = ", props.interview, "mode = ", mode)

    function remove(interview) {
      // props.id is the interview slot
      props.cancelInterview(props.id)
        .then(res=>{
          console.log('DELETED', props.id)
          transition(EMPTY)
          })
    }


  
  return (
    <article className="appointment">
      <header>{props.time}</header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={remove}
          />
          )}
      {mode === CREATE && <Form 
      interviewers={props.interviewers} 
      onCancel={back} 
      onSave={save} 
      />}
      {mode === SAVING && <Status message={"Saving"}/>}
    </article>
  );
};