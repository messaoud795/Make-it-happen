import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import ModalEditField from "../field/ModalEditField";
import "./Goal.css";
import ModalDeleteGoal from "./ModalDeleteGoal";
import ModalEditGoal from "./ModalEditGoal";

export default function Goal({ id, data }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { description, startDate, endDate } = data;

  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const handleModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };

  return (
    <div className="Goal">
      <div className="Goal__operations">
        <div onClick={handleModalEdit}>
          <Icon name="edit" className="edit" />
          <ModalEditGoal
            open={openModalEdit}
            setOpen={handleModalEdit}
            GoalData={data}
          />
        </div>
        <div onClick={handleModalDelete}>
          <Icon name="delete" className="delete" />
          <ModalDeleteGoal
            open={openModalDelete}
            handleModalDelete={handleModalDelete}
            GoalData={data}
          />
        </div>
      </div>

      <p className="Goal__description">{description}</p>
      <div className="Goal__time">
        <span>{startDate.slice(1, 10)}</span>
        <span>{endDate.slice(1, 10)}</span>
      </div>
    </div>
  );
}
