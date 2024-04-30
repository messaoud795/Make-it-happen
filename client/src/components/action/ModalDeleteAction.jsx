import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import {
  deleteAction,
  loadActions,
  loadTodayActions,
} from "../../actions/action_actions";

export default function ModalDeleteAction({
  openModalDelete,
  handleModalDelete,
  data,
}) {
  const dispatch = useDispatch();
  const { loadingAction, error } = useSelector((state) => state.action);

  const handleDeleteAction = () => {
    dispatch(deleteAction(data._id));
    if (!loadingAction && !error) {
      handleModalDelete();
      dispatch(loadActions(data.fieldId));
      dispatch(loadTodayActions());
    }
  };
  return (
    <Modal
      className="ModalRegister"
      onClose={handleModalDelete}
      onOpen={handleModalDelete}
      open={openModalDelete}
    >
      <Modal.Header>Confirm to delete this Goal</Modal.Header>
      <Modal.Content>
        <h3>{data.description}</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" primary onClick={handleModalDelete} />
        <Button content="OK" negative onClick={handleDeleteAction} />
      </Modal.Actions>
    </Modal>
  );
}
