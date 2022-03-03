import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  // replaces the most recent stack mode with a new mode
  function transition(mode, replace = false) {
    setHistory((prev) => {
      const newHistory = [...prev];
      if (replace) {
        newHistory.pop();
      }
      newHistory.push(mode);
      return newHistory;
    });
  }

  // goes back in stack history by 1 
  const back = function () {
    if (history.length === 1) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };

  const mode = history[history.length - 1];
  return { mode, transition, back };
}
