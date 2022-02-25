import React, { useState } from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const {avatar, id, name, selected} = props;

  const listClass = classNames({
    "interviewers__item":props,
    "interviewers__item--selected": props.selected
  })


  return (
    <li 
      className={listClass}
      onClick={props.setInterviewer}
    
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
        {selected && name}
     </li>
  )
}
