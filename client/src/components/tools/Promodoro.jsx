import React, { useState } from "react";
import "./Promodoro.css";
import Timer from "react-compound-timer";

export default function Promodoro() {
  const [distractions, setDistractions] = useState(0);

  const incrementDistractions = () => {
    setDistractions(distractions + 1);
  };

  return (
    <div className="Promodoro">
      <h2>Promodoro</h2> <div className="Promodoro__goal">25</div>
      <div className="Promodoro__distractions">{distractions}</div>
      <Timer
        className="Promodoro__timer"
        initialTime={1500000}
        startImmediately={false}
        formatValue={(value) => `${value < 10 ? `0${value}` : value}  `}
        direction="backward"
      >
        {({ start, reset, stop }) => (
          <React.Fragment>
            <div className="Promodoro__time" onClick={incrementDistractions}>
              <Timer.Minutes />: <Timer.Seconds />
            </div>
            <br />
            <div>
              <button onClick={start}>Start</button>
              <button onClick={stop}>Stop</button>
              <button onClick={reset}>Reset</button>
            </div>
          </React.Fragment>
        )}
      </Timer>
    </div>
  );
}
