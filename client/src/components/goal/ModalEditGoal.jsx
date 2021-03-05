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
  const { category } = GoalData;
  const { loadingGoal, error } = useSelector((state) => state.goal);
  const [description, setDescription] = useState(GoalData.description);
  const [endDate, setEndDate] = useState(new Date(GoalData.endDate));
  const [startDate, setStartDate] = useState(new Date(GoalData.startDate));
  const dispatch = useDispatch();

  const submitForm = async (e) => {
    if (
      category === "long term" &&
      startDate.getFullYear() - endDate.getFullYear() >= 0
    )
      toastr.error(
        "Error",
        "Please enter an end date superior at the start date"
      );
    else if (
      category === "mid term" &&
      startDate.getMonth() - endDate.getMonth() >= 0
    )
      toastr.error(
        "Error",
        "Please enter an end date superior at the start date"
      );
    else {
      const data = {
        id: GoalData._id,
        description,
        startDate: startDate.toLocaleString().slice(1, 10),
        endDate: endDate.toLocaleString().slice(1, 10),
      };
      await dispatch(editGoal(data));
      e.preventDefault();

      if (!loadingGoal && !error) {
        handleModalEdit();
        dispatch(loadGoals(GoalData.fieldId));
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
      <Modal.Header>{`Update ${category} goal `}</Modal.Header>
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
                dateFormat="dd/MM/yyyy"
              />
            </Form.Field>
            <Form.Field>
              <label>End Date</label>
              <DatePicker
                onChange={(date) => setEndDate(date)}
                selected={endDate}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Field>
          </Form.Group>{" "}
          <Button content="Cancel" onClick={handleModalEdit} secondary />
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            positive
            onClick={submitForm}
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
}
