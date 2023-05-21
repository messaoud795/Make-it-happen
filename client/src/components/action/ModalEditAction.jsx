import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import "../../components/nav/auth/ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import {
  editAction,
  loadActions,
  loadTodayActions,
} from "../../actions/action_actions";
import "./ModalAddAction.css";

export default function ModalEditAction({
  openModalEdit,
  handleModalEdit,
  data,
}) {
  const [details, setDetails] = useState({
    description: data.description,
    priority: data.priority,
    type: data.type,
  });
  const [startDate, setStartDate] = useState(data.startDate);
  const { error, loadingAction } = useSelector((state) => state.action);
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    const { description, priority, type } = details;
    const Data = {
      id: data._id,
      description,
      priority,
      type,
      startDate,
    };
    dispatch(editAction(Data));
    if (!loadingAction && !error) {
      handleModalEdit();
      dispatch(loadActions(data.fieldId));
      dispatch(loadTodayActions());
    }
  };
  return (
    <Modal
      className="ModalRegister"
      onClose={handleModalEdit}
      onOpen={handleModalEdit}
      open={openModalEdit}
    >
      <Modal.Header content="Edit action details" />
      <Modal.Content>
        <Form onSubmit={submitForm}>
          <Form.Field>
            <label>Description</label>
            <input
              required={true}
              name="description"
              placeholder="description"
              onChange={(e) =>
                setDetails({ ...details, description: e.target.value })
              }
              value={details.description}
            />
          </Form.Field>
          <Form.Group widths="2">
            <Form.Field>
              <label>Priority</label>
              <select
                onChange={() =>
                  setDetails({
                    ...details,
                    priority: document.getElementById("priority").value,
                  })
                }
                id="priority"
                value={details.priority}
              >
                <option value="">--</option>
                <option value="Important and urgent">
                  Important and urgent
                </option>
                <option value="Important and not urgent">
                  Important and not urgent
                </option>
                <option value="Not important and urgent">
                  Not important and urgent
                </option>
                <option value="Not important and not urgent">
                  Not important and not urgent
                </option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Type</label>
              <select
                onChange={() =>
                  setDetails({
                    ...details,
                    type: document.getElementById("type").value,
                  })
                }
                id="type"
                value={details.type}
              >
                <option value="">--</option>
                <option value="Daily habit">Daily Habit</option>
                <option value="Weekly habit">Weekly Habit</option>
              </select>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="2">
            <Form.Field>
              <label>Date</label>
              <DatePicker
                onChange={(date) => setStartDate(date)}
                selected={startDate}
                showTimeInput
                timeFormat="HH:mm"
                dateFormat="dd/MM/yyyy,  HH:mm"
              />
            </Form.Field>
          </Form.Group>
          <Button content="Cancel" onClick={handleModalEdit} secondary />
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            loading={loadingAction}
            positive
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
}
