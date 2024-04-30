import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import { deleteGoal, loadGoals } from "../../actions/goal_actions";

export default function ModalDeleteGoal({
  openModalDelete,
  handleModalDelete,
  GoalData,
}) {
  const dispatch = useDispatch();
  const { loadingGoal, error } = useSelector((state) => state.goal);

  const handleDeleteGoal = async () => {
    await dispatch(deleteGoal(GoalData._id, GoalData.fieldId));
    if (!loadingGoal && !error) {
      dispatch(loadGoals(GoalData.fieldId));
      handleModalDelete();
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
        <h3>{GoalData.description}</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" primary onClick={handleModalDelete} />
        <Button content="OK" negative onClick={handleDeleteGoal} />
      </Modal.Actions>
    </Modal>
  );
}
