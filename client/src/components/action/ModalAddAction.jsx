import React, { useState } from "react";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import "../../components/nav/auth/ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { addAction, loadActions } from "../../actions/action_actions";
import "./ModalAddAction.css";

export default function ModalAddAction({ fieldId, parentId }) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    description: "",
    priority: "",
    type: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const { error, loadingAction } = useSelector((state) => state.action);
  const dispatch = useDispatch();

  const init = () => {
    setDetails({
      description: "",
      priority: "",
      type: "",
    });
    setStartDate(new Date());
    setOpen(false);
  };

  const submitForm = async (e) => {
    const { description, priority, type } = details;
    const data = {
      description,
      priority,
      type,
      startDate,
      fieldId,
      parentId,
    };
    e.preventDefault();
    dispatch(addAction(data));
    if (!loadingAction && !error) {
      init();
      dispatch(loadActions(data.fieldId));
    }
  };
  return (
    <Modal
      className="ModalRegister"
      onClose={init}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <div className="iconAdd">
          <Icon name="add circle" />
          <span className="tooltiptext">Add an action</span>
        </div>
      }
    >
      <Modal.Header content="Enter action details" />
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
              >
                <option value="">--</option>
                <option value="habit">Daily habit</option>
                <option value="habit">Weekly habit</option>
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
                dateFormat="dd/MM/yyyy, HH:mm "
              />
            </Form.Field>
            {/* <Form.Field>
              <label>End Date</label>
              <DatePicker
                onChange={(date) => setEndDate(date)}
                selected={endDate}
                showTimeInput
                timeFormat="HH:mm"
                dateFormat="dd/MM/yyyy, HH:mm "
              />
            </Form.Field> */}
          </Form.Group>
          <Button content="Cancel" onClick={init} secondary />
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
