import React, { useState } from "react";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import "../../components/nav/auth/ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { toastr } from "react-redux-toastr";
import { addGoal, loadGoals } from "../../actions/goal_actions";
import "./ModalAddGoal.css";

export default function ModalAddGoal({ fieldId, category, parentId }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState("private");

  const { error, loadingGoal } = useSelector((state) => state.goal);
  const dispatch = useDispatch();

  const submitForm = async (e) => {
    if (
      category === "long term" &&
      startDate.getFullYear() - endDate.getFullYear() >= 0
    )
      toastr.error("Error", "Please enter a valid date range of several years");
    else if (
      category === "mid term" &&
      (endDate.getTime() - startDate.getTime() < 2764800000 ||
        endDate.getTime() - startDate.getTime() > 33177600000)
    )
      toastr.error("Error", "Please enter a date range of several months");
    else if (
      category === "short term" &&
      (endDate.getTime() - startDate.getTime() < 604800000 ||
        endDate.getTime() - startDate.getTime() > 2764800000)
    )
      toastr.error("Error", "Please enter a valid date range of several weeks");
    else {
      const data = {
        description,
        category,
        startDate,
        endDate,
        status,
        fieldId,
        parentId,
      };

      e.preventDefault();
      await dispatch(addGoal(data));
      if (!loadingGoal && !error) {
        setOpen(false);
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
        <div className="iconAdd">
          <Icon name="add circle" />
          <span className="tooltiptext">{`Enter ${category} goal `}</span>
        </div>
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
                dateFormat="dd/MM/yyyy "
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
          </Form.Group>
          <Form.Field className="Goal__status">
            <input
              type="radio"
              id="private"
              name="status"
              value="private"
              checked={status === "private"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label htmlFor="private">Private</label>
            <input
              type="radio"
              id="public"
              name="status"
              value="public"
              checked={status === "public"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label htmlFor="public">Public</label>
          </Form.Field>
          <Button content="Cancel" onClick={(e) => setOpen(false)} secondary />
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
