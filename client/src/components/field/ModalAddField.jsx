import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import "../../components/nav/auth/ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { addField } from "../../actions/field_actions";

export default function ModalAddField({ open, setOpen }) {
  const [input, setInput] = useState("");
  const { error } = useSelector((state) => state.field);
  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();
    let data = { name: input.toUpperCase() };
    await dispatch(addField(data));
    if (!error) {
      await setOpen();
      setInput("");
    }
  };
  return (
    <Modal
      className="ModalRegister"
      onClose={() => setOpen()}
      onOpen={() => setOpen()}
      open={open}
    >
      <Modal.Header>Enter the name of the field</Modal.Header>
      <Modal.Content>
        <Form onSubmit={submitForm}>
          <Form.Field required>
            <input
              placeholder="new field"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </Form.Field>
          <Button content="cancel" onClick={setOpen} secondary />
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
