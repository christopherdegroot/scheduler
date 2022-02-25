import React, { useState } from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props;

  const listClass = classNames({
    "day-list__item":props,
    "day-list__item--full": props.spots < 1,
    "day-list__item--selected": props.selected
  })

  
  const formatSpots = function(spots) {
    let spotString = '';
    if (spots === 0) {
      spotString += 'no spots remaining';
    }
    if (spots === 1) {
      spotString += '1 spot remaining'
    }
    if (spots > 1) {
      spotString += `${spots} spots remaining`
    }
    return spotString;
  }
                                                              

  return (
    <li 
    className={listClass}
    onClick={() => props.setDay(props.name)}
    >
      <h2  className="text--regular">{name}</h2> 
      <h3  className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}