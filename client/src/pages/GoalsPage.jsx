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
          {goals?.length > 0 ? (
            goals
              ?.filter((goal) => goal.category === "long term")
              .map((goal) => (
                <GoalLT key={goal._id} data={{ ...goal, fieldId }} />
              ))
          ) : (
            <h3> No goals are created yet</h3>
          )}
        </div>
      </div>
      <div className="GoalsPage__tools">
        <h2>Tools to finish actions :</h2>
        <Promodoro />
        <div>
          {loadingGoal ? <Loader active className="loader" /> : <Partners />}
        </div>
      </div>
    </div>
  );
}
