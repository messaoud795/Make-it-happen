import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import "../../components/nav/auth/ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { toastr } from "react-redux-toastr";
import { editGoal, loadGoals } from "../../actions/goal_actions";

export default function ModalEditGoal({
  openModalEdit,
  handleModalEdit,
  GoalData,
}) {
  const { loadingGoal, error } = useSelector((state) => state.goal);
  const [description, setDescription] = useState(GoalData.description);
  const [endDate, setEndDate] = useState(new Date(GoalData.endDate));
  const [startDate, setStartDate] = useState(new Date(GoalData.startDate));
  const { _id, fieldId } = GoalData;
  const dispatch = useDispatch();

  const submitForm = async (e) => {
    if (startDate.getFullYear() - endDate.getFullYear() >= 0)
      toastr.error(
        "Error",
        "Please enter an end date greater than the start date"
      );
    else {
      const data = {
        id: _id,
        description,
        startDate: startDate.toLocaleString().slice(1, 10),
        endDate: endDate.toLocaleString().slice(1, 10),
        fieldId,
        parentId: fieldId,
      };
      await dispatch(editGoal(data));
      e.preventDefault();

      if (!loadingGoal && !error) {
        handleModalEdit();
        dispatch(loadGoals(fieldId));
      }
    }
  };

  return (
    <Modal
      className="ModalRegister"
      onClose={handleModalEdit}
      onOpen={handleModalEdit}
      open={openModalEdit}
    >
      <Modal.Header>Update long term goal data</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Description</label>
            <input
              required={true}
              name="description"
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Form.Field>

          <Form.Group widths="3">
            <Form.Field>
              <label>Start date</label>
              <DatePicker
                onChange={(date) => setStartDate(date)}
                selected={startDate}
              />
            </Form.Field>
            <Form.Field>
              <label>End Date</label>
              <DatePicker
                onChange={(date) => setEndDate(date)}
                selected={endDate}
              />
            </Form.Field>
          </Form.Group>
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            positive
            onClick={submitForm}
          />
          <Button content="Cancel" onClick={handleModalEdit} negative />
        </Form>
      </Modal.Content>
    </Modal>
  );
}
