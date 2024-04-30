import React, { useEffect, useState } from "react";
import "./Promodoro.css";
import Timer from "react-compound-timer";
import { Icon } from "semantic-ui-react";
import {
  loadPromodoro,
  updateDistractions,
} from "../../actions/promodoro_actions";
import { useDispatch, useSelector } from "react-redux";

export default function Promodoro() {
  const [distractions, setDistractions] = useState(0);
  const [timerState, setTimerState] = useState("inited");
  const { record } = useSelector((state) => state.promodoro);
  const [showTimer, setShowTimer] = useState(true);
  const dispatch = useDispatch();
  const tiRef = React.createRef();

  useEffect(() => {
    dispatch(loadPromodoro());
  }, [dispatch]);

  useEffect(() => {
    if (timerState === "finished" && distractions > 0) {
      dispatch(updateDistractions({ result: distractions }));
      setTimerState("inited");
      setDistractions(0);
    }
  }, [timerState, dispatch, distractions]);

  useEffect(() => {
    if (!showTimer) {
      setShowTimer(true);
      dispatch(loadPromodoro());
    }
  }, [showTimer, dispatch]);

  const incrementDistractions = () => {
    if (timerState === "playing") setDistractions(distractions + 1);
  };

  return (
    <div className="Promodoro">
      {showTimer && (
        <Timer
          className="Promodoro__timer"
          initialTime={900000}
          startImmediately={false}
          formatValue={(value) => `${value < 10 ? `0${value}` : value}  `}
          direction="backward"
          onStart={() => {
            setTimerState("playing");
          }}
          checkpoints={[
            {
              time: 0,
              callback: function (e) {
                setTimerState("finished");
                setShowTimer(false);
              },
            },
          ]}
        >
          {({ start }) => (
            <div className="Promodoro__content" ref={tiRef}>
              <div className="Promodoro__time" onClick={incrementDistractions}>
                <div className="score-container">
                  <span
                    style={{ backgroundColor: "#8ADEFF" }}
                    className={"score"}
                    onClick={incrementDistractions}
                  >
                    {distractions}
                  </span>
                  <span>score</span>
                </div>
                <span className="time-units">
                  <Timer.Minutes />
                </span>
                <span style={{ fontSize: "2rem", fontWeight: "bold" }}>:</span>
                <span className="time-units">
                  <Timer.Seconds />
                </span>
                <div className="score-container">
                  <span
                    style={{ backgroundColor: "#F7E277" }}
                    className={"score"}
                  >
                    {record ?? 30}
                  </span>
                  <span>record</span>
                </div>
              </div>
              <div className="Promodoro__control">
                <div
                  onClick={() => {
                    start();
                  }}
                >
                  <Icon name="play circle" size="huge" />
                </div>
              </div>
            </div>
          )}
        </Timer>
      )}
      <p className="promodoro__description">
        Focus on a task during 15mn, each time you notice that you are
        distracted click on the counter. On the left, you have the goal to aim
        for, on the right you have the number of distractions.
      </p>
    </div>
  );
}
