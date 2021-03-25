import React, { useState } from "react";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import "./ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { login_action } from "../../../actions/auth_actions";

export default function ModalLogin({ open, setOpen }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { authenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.async);
  const init = () => {
    setOpen();
    setInputs({ email: "", password: "" });
  };

  const dispatch = useDispatch();
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login_action(inputs));
    if (authenticated && !loading) {
      init();
    }
  };
  return (
    <Modal className="ModalLogin" onClose={init} onOpen={setOpen} open={open}>
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
          <Button content="Cancel" onClick={setOpen} negative />
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            loading={loading}
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
