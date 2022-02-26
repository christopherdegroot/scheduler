import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace === true) {
      setMode(mode)
      const newHistory = [...history]
      newHistory[newHistory.length - 1] = mode;
      setHistory(newHistory)
    } else {
      setMode(mode)
      const prevHistory = [...history]
      prevHistory.push(mode)
      setHistory(prevHistory)
    }
  }

  const back = function() {
    let newHistory = [...history]
    newHistory.pop(mode);
    if(history.length > 1) { 
      setHistory(newHistory);
      setMode(newHistory[newHistory.length -1])
    }
  }

  return { mode, transition, back };
}