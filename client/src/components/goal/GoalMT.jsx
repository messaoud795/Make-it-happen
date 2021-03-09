import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import ModalDeleteGoal from "./ModalDeleteGoal";
import ModalEditGoal from "./ModalEditGoal";
import ModalAddGoal from "./ModalAddGoal";
import { useSelector } from "react-redux";
import "./GoalMT.css";
import GoalST from "./GoalST";

export default function GoalMT({ data }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { description, startDate, endDate } = data;
  const { goals } = useSelector((state) => state.goal);

  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const handleModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };

  return (
    <div>
      <div className="GoalMT-add">
        <div className="GoalMT__content">
          <div className="Goal__operations">
            <div onClick={handleModalEdit}>
              <Icon name="edit" className="edit" />
            </div>
            <ModalEditGoal
              openModalEdit={openModalEdit}
              handleModalEdit={handleModalEdit}
              GoalData={data}
            />
            <div onClick={handleModalDelete}>
              <Icon name="delete" className="delete" />
            </div>
            <ModalDeleteGoal
              openModalDelete={openModalDelete}
              handleModalDelete={handleModalDelete}
              GoalData={data}
            />
          </div>

          <p className="GoalMT__description">{description}</p>
          <div className="Goal__time">
            <span>{startDate.toLocaleString().slice(0, 10)}</span>
            <span>{endDate.toLocaleString().slice(0, 10)}</span>
          </div>
        </div>
        <ModalAddGoal
          fieldId={data.fieldId}
          category="short term"
          parentId={data._id}
        />
      </div>
      {goals
        ?.filter(
          (goal) => goal.category === "short term" && goal.parentId === data._id
        )
        .map((goal) => (
          <GoalST key={goal._id} data={{ ...goal }} />
        ))}
    </div>
  );
}
