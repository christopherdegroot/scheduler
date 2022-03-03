import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


// Form component for Appointment
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // resets state
  const reset = function() {
    setStudent("");
    setInterviewer(null);
  }

  // calls reset when cancel button is clicked
  const cancel = function () {
    reset();
    props.onCancel()
  }

  // validates state by checking whether student name is blank
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
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
            onChange={(event)=> setStudent(event.target.value)} 
            data-testid="student-name-input"
            />
            <section className="appointment__validation">{error}</section>
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
          <Button confirm onSubmit={event => event.preventDefault()} onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};