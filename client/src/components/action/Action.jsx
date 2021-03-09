import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import "./Action.css";
import ModalDeleteAction from "./ModalDeleteAction";
import ModalEditAction from "./ModalEditAction";
import { format } from "date-fns";

export default function Action({ data }) {
  const { description, startDate, endDate, priority } = data;
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const handleModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };

  return (
    <div className="action__content">
      <div className="action__operations">
        <div onClick={handleModalEdit}>
          <Icon name="edit" className="edit" />
        </div>
        <ModalEditAction
          openModalEdit={openModalEdit}
          handleModalEdit={handleModalEdit}
          data={data}
        />
        <div onClick={handleModalDelete}>
          <Icon name="delete" className="delete" />
        </div>
        <ModalDeleteAction
          openModalDelete={openModalDelete}
          handleModalDelete={handleModalDelete}
          data={data}
        />
      </div>
      <span className="action__priority">{priority}</span>

      <span className="action__description">{description}</span>

      <div className="action__time">
        <span>
          {format(startDate, "dd/MM/yyyy")} at {format(startDate, "HH:mm ")}
        </span>
        <span>
          {format(endDate, "dd/MM/yyyy")} at {format(endDate, "HH:mm ")}
        </span>
      </div>
    </div>
  );
}
