import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import "../../components/nav/auth/ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { toastr } from "react-redux-toastr";
import { addGoal, loadGoals } from "../../actions/goal_actions";

export default function ModalAddField({ fieldId, category, parentId }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const { error, loadingGoal } = useSelector((state) => state.goal);
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
        description,
        category: category,
        startDate: startDate.toLocaleString().slice(1, 10),
        endDate: endDate.toLocaleString().slice(1, 10),
        fieldId,
        parentId: parentId,
      };

      e.preventDefault();
      await dispatch(addGoal(data));
      if (!loadingGoal && !error) {
        setOpen();
        dispatch(loadGoals(data.fieldId));
        setDescription("");
        setStartDate(new Date());
        setEndDate(new Date());
      }
    }
  };
  return (
    <Modal
      className="ModalRegister"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button content={`Enter ${category} goal `} icon="add" positive />
      }
    >
      <Modal.Header content={`Enter ${category} goal data`} />
      <Modal.Content>
        <Form onSubmit={submitForm}>
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
            loading={loadingGoal}
            positive
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
}
