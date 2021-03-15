import React, { useEffect, useState } from "react";
import "./Promodoro.css";
import Timer from "react-compound-timer";
import { Icon } from "semantic-ui-react";
import {
  addDistractions,
  loadPromodoro,
  updateDistractions,
} from "../../actions/promodoro_actions";
import { useDispatch, useSelector } from "react-redux";

export default function Promodoro() {
  const [distractions, setDistractions] = useState(0);
  const [timerState, setTimerState] = useState("inited");
  const { results, goal } = useSelector((state) => state.promodoro);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPromodoro());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timerState === "finished") {
      console.log(results);
      if (!results) dispatch(addDistractions({ result: distractions }));
      else {
        dispatch(updateDistractions({ result: distractions }));
      }
      setTimerState("inited");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState]);

  const saveDistractions = () => {
    setTimerState("finished");
  };

  const incrementDistractions = () => {
    if (timerState === "playing") setDistractions(distractions + 1);
  };
  const resetDistractions = () => {
    setTimerState("reset");
    setDistractions(0);
  };

  return (
    <div className="Promodoro">
      <h2>Promodoro</h2>{" "}
      <Timer
        className="Promodoro__timer"
        initialTime={10000}
        startImmediately={false}
        formatValue={(value) => `${value < 10 ? `0${value}` : value}  `}
        direction="backward"
      >
        {({ start, reset, stop }) => (
          <div className="Promodoro__content">
            <div
              className={
                "Promodoro__goal " +
                (goal?.toString().length === 1
                  ? "single-digit"
                  : "double-digit")
              }
            >
              {goal}
            </div>
            <div
              className={
                "Promodoro__distractions " +
                (distractions.toString().length === 1
                  ? "single-digit "
                  : "double-digit ") +
                (distractions < goal ? "oncourse" : "ofcourse")
              }
            >
              {distractions}
            </div>
            <div className="Promodoro__time" onClick={incrementDistractions}>
              <Timer.Minutes />: <Timer.Seconds />
            </div>
            <div className="Promodoro__control">
              <button
                onClick={() => {
                  start();
                  setTimerState("playing");
                  setTimeout(saveDistractions, 10000);
                }}
              >
                <Icon name="play circle" />
                Start
              </button>

              <button
                onClick={() => {
                  stop();
                  reset();
                  resetDistractions();
                }}
              >
                <Icon name="repeat" />
                Reset
              </button>
            </div>
          </div>
        )}
      </Timer>
    </div>
  );
}
