import React from "react";

import DayListItem from "./DayListItem";


export default function DayList(props) {
  const dayList = props.days;
  const parsedDayList = dayList.map(Day => <DayListItem 
    key={Day.id}
    {...Day}
    setDay={props.onChange}  
    selected={props.value===Day.name} />)
 
  return (
    <ul>
      {parsedDayList}
    </ul>
  );
}