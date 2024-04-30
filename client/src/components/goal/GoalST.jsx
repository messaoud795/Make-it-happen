import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import ModalDeleteGoal from "./ModalDeleteGoal";
import ModalEditGoal from "./ModalEditGoal";
import { useSelector } from "react-redux";
import "./GoalST.css";
import ModalAddAction from "../action/ModalAddAction";
import Action from "../action/Action";

export default function GoalST({ data }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { description, startDate, endDate } = data;
  const { actions } = useSelector((state) => state.action);

  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const handleModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };

  return (
    <div>
      <div className="GoalST-add">
        <div className="GoalST__content">
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

          <p className="GoalST__description">{description}</p>
          <div className="Goal__time">
            <span>{startDate.toLocaleString().slice(0, 10)}</span>
            <span>{endDate.toLocaleString().slice(0, 10)}</span>
          </div>
        </div>
        <ModalAddAction fieldId={data.fieldId} parentId={data._id} />
      </div>
      <div className="goal-actions">
        {actions
          ?.filter((action) => action.parentId === data._id)
          .map((action) => (
            <Action key={action._id} data={{ ...action }} />
          ))}
      </div>
    </div>
  );
}
