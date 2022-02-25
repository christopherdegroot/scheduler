import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import InterviewerListItem from "components/InterviewerListItem";

export default function Form(props) {
  console.log('logging props', props)
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function() {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = function () {
    reset();
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            type="text"
            placeholder={"Enter Student Name"}
            onSave={props.onSave}
            onCancel={cancel}
            onChange={(event)=> setStudent(event.target.value)} 
            />
        </form>
        <InterviewerList
        value={interviewer}
        {...props}
        onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};