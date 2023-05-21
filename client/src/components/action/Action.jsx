import React, { useState } from "react";
import { Checkbox, Icon } from "semantic-ui-react";
import "./Action.css";
import ModalDeleteAction from "./ModalDeleteAction";
import ModalEditAction from "./ModalEditAction";
import { format } from "date-fns";
import {
  editAction,
  loadActions,
  loadTodayActions,
} from "../../actions/action_actions";
import { useDispatch } from "react-redux";

export default function Action({ data }) {
  const { description, startDate, priority, type, completed, _id } = data;
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const dispatch = useDispatch();

  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const handleModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  };
  const updateCompletedStatus = () => {
    dispatch(
      editAction({
        id: _id,
        completed: {
          status: !completed.status,
          completionDate: new Date(),
        },
      })
    );
    dispatch(loadActions(data.fieldId));
    dispatch(loadTodayActions());
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
      <span className="action__priority">
        {priority} -- {type}
      </span>
      <div className="action__description">
        <Checkbox checked={completed.status} onChange={updateCompletedStatus} />
        <span>{description}</span>
      </div>
      <div className="action__time">
        <span>
          {format(startDate, "HH:mm ")} -- {format(startDate, "dd/MM/yyyy")}
        </span>
        {/* <span>
          {format(endDate, "HH:mm ")} -- {format(endDate, "dd/MM/yyyy")}
        </span> */}
      </div>
    </div>
  );
}
