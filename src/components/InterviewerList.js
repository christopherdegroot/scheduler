import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


function InterviewerList(props) {

  const parsedInterviewerList = props.interviewers.map(interviewer => 
    <InterviewerListItem 
    key={interviewer.id}
    {...interviewer} 
    selected={props.value===interviewer.id}
    setInterviewer={() => props.onChange(interviewer.id)} 
    />)
    
    return (
      <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewerList}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;