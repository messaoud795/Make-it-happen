import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import "./Goal.css";
import ModalDeleteGoal from "./ModalDeleteGoal";
import ModalEditGoal from "./ModalEditGoal";

export default function Goal({ id, data }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const { description, startDate, endDate } = data;

  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const handleModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };
  const handleModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
  };
  return (
    <div className="Goal">
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

      <p className="Goal__description">{description}</p>
      <div className="Goal__time">
        <span>{startDate}</span>
        <span>{endDate}</span>
      </div>
      <button onClick={handleModalAdd}>add a mid term goal</button>
    </div>
  );
}
