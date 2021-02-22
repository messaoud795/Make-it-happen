import React, { useEffect, useState } from "react";
import "./Goalspage.css";
import ModalAddGoal from "../components/goal/ModalAddGoal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GoalLT from "../components/goal/GoalLT";
import { loadGoals } from "../actions/goal_actions";
import { Loader } from "semantic-ui-react";

export default function GoalsPage(props) {
  const [fieldName, setfieldName] = useState("");
  const field = useSelector((state) => state.field);
  const { goals, loadingGoal } = useSelector((state) => state.goal);
  const fieldId = useParams().fieldId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (field.name) {
      setfieldName(field.name.filter((el) => el._id === fieldId)[0].name);
    }
    dispatch(loadGoals(fieldId));
  }, [dispatch, field, fieldId]);

  return (
    <div className="GoalsPage">
      <p className="GoalsPage__quote">
        Sweat more during peace bleed less during war
      </p>
      <div className="GoalsPage__header">
        <h1> {`Plan in ${fieldName.toLowerCase()} :`}</h1>
        <ModalAddGoal
          fieldId={fieldId}
          category="long Term"
          parentId={fieldId}
        />
      </div>
      {loadingGoal ? (
        <Loader active className="loader" />
      ) : (
        <div className="GoalsPage__plan">
          {goals
            ?.filter((goal) => goal.category === "long term")
            .map((goal) => (
              <GoalLT key={goal._id} data={{ ...goal, fieldId }} />
            ))}
        </div>
      )}
    </div>
  );
}
