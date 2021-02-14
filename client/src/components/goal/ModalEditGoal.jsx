import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import "../../components/nav/auth/ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "./ModalAddGoal.css";
import { toastr } from "react-redux-toastr";

export default function ModalEditGoal({ open, setOpen, GoalData }) {
  const [description, setDescription] = useState(GoalData.description);
  const [endDate, setEndDate] = useState(GoalData.endDate);
  const [startDate, setStartDate] = useState(GoalData.startDate);

  const submitForm = async (e) => {
    // if (startDate.getFullYear() - endDate.getFullYear() >= 0)
    //   toastr.error(
    //     "Error",
    //     "Please enter an end date superior at the start date"
    //   );
    // else {
    //   const data = {
    //     description,
    //     category: "long Term",
    //     startDate: startDate.toLocaleString(),
    //     endDate: endDate.toLocaleString(),
    //     fieldId,
    //     parentId: fieldId,
    //   };
    //   e.preventDefault();
    //   await dispatch(addGoal(data));
    //   if (!loadingGoal && !error) {
    //     setOpen();
    //     setDescription("");
    //     setStartDate(new Date());
    //     setEndDate(new Date());
    //   }
    // }
  };

  return (
    <Modal
      className="ModalRegister"
      onClose={setOpen}
      onOpen={setOpen}
      open={open}
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
          />
          <Button content="Cancel" onClick={setOpen} negative />
        </Form>
      </Modal.Content>
    </Modal>
  );
}
