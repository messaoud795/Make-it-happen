import React, { useState } from "react";
import "./Field.css";
import ModalEditField from "./ModalEditField";
import ModalDeleteField from "./ModalDeleteField";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Field({ name, id, children }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };

  return (
    <div className="Field">
      <div className="Field__operations">
        <div onClick={() => setOpenModalEdit(true)}>
          <Icon name="edit" className="edit" />
          <ModalEditField
            open={openModalEdit}
            setOpen={setOpenModalEdit}
            id={id}
            name={name}
          />
        </div>
        <div onClick={handleModalDelete}>
          <Icon name="delete" className="delete" />
          <ModalDeleteField
            open={openModalDelete}
            handleModalDelete={handleModalDelete}
            id={id}
            name={name}
          />
        </div>
      </div>
      <div className="field__content">
        <Link to={`/field/${id}`} className="Field__text">
          <span>{name}</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
