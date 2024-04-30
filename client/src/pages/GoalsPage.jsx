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
import { loadFields } from "../actions/field_actions";
import { payment } from "../actions/payment_actions";
import { toastr } from "react-redux-toastr";
import ToolsIcon from "../icons/ToolsIcon.jsx";
import PlanIcon from "../icons/PlanIcon.jsx";

export default function GoalsPage(props) {
  const [fieldName, setfieldName] = useState("");
  const [listGoalLT, setListGoalLT] = useState("");
  const [showPomodoro, setShowPomodoro] = useState(true);
  const field = useSelector((state) => state.field);
  const { goals, loadingGoal } = useSelector((state) => state.goal);
  const { profile } = useSelector((state) => state.auth);
  const fieldId = useParams().fieldId;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFields());
  }, [dispatch]);

  useEffect(() => {
    setfieldName(
      field.name?.filter((el) => el._id === fieldId)[0].name.toLowerCase()
    );
    dispatch(loadGoals(fieldId));
    dispatch(loadActions(fieldId));
  }, [dispatch, fieldId, field.name]);

  useEffect(() => {
    setListGoalLT(goals?.filter((goal) => goal.category === "long term"));
  }, [goals]);

  const handlePayment = () => {
    if (profile.paid) setShowPomodoro(false);
    else {
      toastr.success("Payment", " the Payment page is loading");
      dispatch(payment());
    }
  };

  return (
    <div className="GoalsPage">
      <div className="GoalsPage__plan">
        <div className="GoalsPage__header">
          <div className="GoalsPage__title">
            <span className={"icon"}>
              <PlanIcon color={"#3276c3"} />
            </span>
            <span>{fieldName ?? ""}</span>
          </div>
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
        <div className="GoalsPage__title">
          <span className="icon">
            <ToolsIcon color={"#3276c3"} />
          </span>
          <span> Tools</span>
        </div>
        <button
          onClick={() => setShowPomodoro(true)}
          className={"toolsBtn " + (showPomodoro ? " activeBtn" : "")}
        >
          Pomodoro
        </button>
        <button
          onClick={handlePayment}
          className={"toolsBtn " + (showPomodoro ? "" : "activeBtn")}
        >
          find peers
        </button>
        {showPomodoro && <Promodoro />}
        <div className="GoalsPage__partners">
          {!showPomodoro && (
            <div>
              {loadingGoal ? (
                <Loader
                  active
                  className="spinner "
                  style={{ marginTop: "10rem" }}
                />
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
