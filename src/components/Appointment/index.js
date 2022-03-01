import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
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

    function deleteInterview(name, interviewer) {
      props.cancelInterview(props.id, interviewer)
      console.log('trying to delete, logging name and interviewer', props.id, interviewer)
    }


  
  return (
    <article className="appointment">
      <header>{props.time}</header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
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