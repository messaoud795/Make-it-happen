import React from "react";
import { Button, Modal } from "semantic-ui-react";
import "../../components/nav/auth/ModalRegister.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteField, loadFields } from "../../actions/field_actions";

export default function ModalDeleteField({
  open,
  handleModalDelete,
  name,
  id,
}) {
  const { error } = useSelector((state) => state.field);
  const dispatch = useDispatch();

  const submitDelete = async () => {
    let data = { id: id };
    await dispatch(deleteField(data));
    if (!error) {
      handleModalDelete();
      dispatch(loadFields());
    }
  };
  return (
    <Modal
      className="ModalRegister"
      onClose={handleModalDelete}
      onOpen={handleModalDelete}
      open={open}
    >
      <Modal.Header>Confirm to delete this field</Modal.Header>
      <Modal.Content>
        <h3>{name}</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" onClick={handleModalDelete} primary />
        <Button content="OK" onClick={submitDelete} negative />
      </Modal.Actions>
    </Modal>
  );
}
