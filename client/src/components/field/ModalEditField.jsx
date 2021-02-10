import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import "../../components/nav/auth/ModalRegister.css";
import { useDispatch } from "react-redux";
import { editField } from "../../actions/field_actions";

export default function ModalEditField({ open, setOpen, id, name }) {
  const [input, setInput] = useState(name);
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    let data = { id: id, name: input.toUpperCase() };
    dispatch(editField(data));
  };
  return (
    <Modal
      className="ModalRegister"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Change the name of the field</Modal.Header>
      <Modal.Content>
        <Form onSubmit={submitForm}>
          <Form.Field required>
            <input
              placeholder="new field"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </Form.Field>

          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            onClick={submitForm}
            positive
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
}
