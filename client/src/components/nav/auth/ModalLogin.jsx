import React, { useState } from "react";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import "./ModalLogin.css";

export default function ModalLogin({ open, setOpen }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const submitForm = (e) => {
    e.preventDefault();
  };
  return (
    <Modal
      className="ModalLogin"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Login</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field required>
            <input
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
              value={inputs.email}
            />
          </Form.Field>
          <Form.Field required>
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
              value={inputs.password}
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
      <Modal.Actions className="ModalLogin__social">
        <Button color="facebook">
          <Icon name="facebook" /> Facebook
        </Button>

        <Button color="google plus">
          <Icon name="google plus" /> Google Plus
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
