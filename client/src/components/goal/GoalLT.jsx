import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import "./GoalLT.css";
import ModalDeleteGoal from "./ModalDeleteGoal";
import ModalEditGoal from "./ModalEditGoal";
import ModalAddGoal from "./ModalAddGoal";
import { useDispatch, useSelector } from "react-redux";
import GoalMT from "./GoalMT";
import { goalPartners } from "../../actions/goal_actions";
import PeersIcon from "../../icons/PeersIcon";

export default function Goal({ data }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { description, startDate, endDate } = data;
  const { goals } = useSelector((state) => state.goal);
  const dispatch = useDispatch();

  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const handleModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };

  return (
    <div className="GoalLT">
      <div className="GoalLT-add">
        <div className="Goal__content">
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

          <p className="Goal__description">
            {description}
            <span
              onClick={() => dispatch(goalPartners(data._id))}
              className="GoalLT__partners"
              title="find someone with the same goal"
            >
              <PeersIcon />
            </span>
          </p>
          <div className="Goal__time">
            <span>{startDate.toLocaleString("fr-FR").slice(0, 10)}</span>
            <span>{endDate.toLocaleString("fr-FR").slice(0, 10)}</span>
          </div>
        </div>
        <ModalAddGoal
          fieldId={data.fieldId}
          category="mid term"
          parentId={data._id}
        />
      </div>
      {goals
        ?.filter(
          (goal) => goal.category === "mid term" && goal.parentId === data._id
        )
        .map((goal) => (
          <GoalMT key={goal._id} data={goal} />
        ))}
    </div>
  );
}
