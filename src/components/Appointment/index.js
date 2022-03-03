import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// Appointment component
export default function Appointment(props) {
  // declaring variables for conditional statements
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDITING = "EDITING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // custom hook for what visual mode to use
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // to pass to form component to capture the name and interviewer and pass them as props to create a new interview object
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((res) => {
        transition(ERROR_SAVE);
      });
  }

  // passes to form component to delete when onConfirm button is clicked inside confirmation window
  function destroy(interview) {
    // props.id is the interview slot
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment">
      <header>{props.time}</header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDITING)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={destroy}
        />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EDITING && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message={"Could not create appointment"} />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message={"Could not cancel appointments"} />
      )}
    </article>
  );
}
