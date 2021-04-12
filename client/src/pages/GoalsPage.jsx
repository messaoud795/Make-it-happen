import React, { useEffect, useState } from "react";
import "./Goalspage.css";
import ModalAddGoal from "../components/goal/ModalAddGoal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GoalLT from "../components/goal/GoalLT";
import { loadGoals } from "../actions/goal_actions";
import { Loader } from "semantic-ui-react";
import { loadActions } from "../actions/action_actions";
import Promodoro from "../components/tools/Promodoro";
import Partners from "../components/goal/Partners";

export default function GoalsPage(props) {
  const [fieldName, setfieldName] = useState("");
  const [listGoalLT, setListGoalLT] = useState("");
  const [showPomodoro, setShowPomodoro] = useState(false);
  const field = useSelector((state) => state.field);
  const { goals, loadingGoal } = useSelector((state) => state.goal);
  const fieldId = useParams().fieldId;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (field.name) {
        setfieldName(field.name.filter((el) => el._id === fieldId)[0].name);
      }
      await dispatch(loadGoals(fieldId));
      await dispatch(loadActions(fieldId));
    }
    fetchData();
  }, [dispatch, field, fieldId, field.name]);

  useEffect(() => {
    setListGoalLT(goals?.filter((goal) => goal.category === "long term"));
  }, [goals]);

  return (
    <div className="GoalsPage">
      <div className="GoalsPage__plan">
        <div className="GoalsPage__header">
          <h1> {`Plan in ${fieldName.toLowerCase()} :`}</h1>
          <ModalAddGoal
            fieldId={fieldId}
            category="long term"
            parentId={fieldId}
          />
        </div>

        <div className="GoalsPage__goals">
          {listGoalLT?.length > 0 ? (
            listGoalLT?.map((goal) => (
              <GoalLT key={goal._id} data={{ ...goal, fieldId }} />
            ))
          ) : (
            <h3> No goals are created yet</h3>
          )}
        </div>
      </div>
      <div className="GoalsPage__tools">
        <h2>Get things done</h2>
        <button onClick={() => setShowPomodoro(true)}>Pomodoro</button>
        <button onClick={() => setShowPomodoro(false)}>find peers</button>
        {showPomodoro && <Promodoro />}
        <div className="GoalsPage__partners">
          {!showPomodoro && (
            <div>
              {loadingGoal ? (
                <Loader active className="spinner" />
              ) : (
                <Partners />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
