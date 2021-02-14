import React, { useEffect, useState } from "react";
import "./Goalspage.css";
import ModalAddGoal from "../components/goal/ModalAddGoal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import Goal from "../components/goal/Goal";
import { loadGoals } from "../actions/goal_actions";
import { Loader } from "semantic-ui-react";

export default function GoalsPage(props) {
  const [openModalAddGoal, setOpenModalAddGoal] = useState(false);
  const [fieldName, setfieldName] = useState("");
  const field = useSelector((state) => state.field);
  const { goals, loadingGoal } = useSelector((state) => state.goal);
  const fieldId = useParams().fieldId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (field.name)
      setfieldName(field.name.filter((el) => el._id === fieldId)[0].name);
    dispatch(loadGoals(fieldId));
  }, []);

  const handleModalAdd = () => {
    setOpenModalAddGoal(!openModalAddGoal);
  };

  return (
    <div className="GoalsPage">
      <p className="GoalsPage__quote">
        Sweat more during peace bleed less during war
      </p>
      <div className="GoalsPage__header">
        <h1> {`Plan in ${fieldName.toLowerCase()} :`}</h1>
        <button onClick={handleModalAdd}>add a long term goal</button>
        <ModalAddGoal
          open={openModalAddGoal}
          setOpen={handleModalAdd}
          fieldId={fieldId}
        />
      </div>
      {loadingGoal ? (
        <Loader inline="centered" />
      ) : (
        <div className="GoalsPage__plan">
          {goals?.map((goal) => (
            <Goal key={goal._id} data={...goal, fieldId} />
          ))}
        </div>
      )}
    </div>
  );
}
