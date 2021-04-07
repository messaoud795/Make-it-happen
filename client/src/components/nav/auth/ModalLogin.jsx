import React, { useEffect, useState } from "react";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import "./ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login_action } from "../../../actions/auth_actions";

export default function ModalLogin() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.async);
  const history = useHistory();
  const init = () => {
    setInputs({ email: "", password: "" });
    setOpen(false);
  };

  const dispatch = useDispatch();
  async function submitForm(e) {
    e.preventDefault();
    await dispatch(login_action(inputs));
  }
  useEffect(() => {
    if (authenticated && !loading) {
      init();
    }
  }, [authenticated, loading, history]);
  return (
    <Modal
      className="ModalLogin"
      onClose={init}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        !authenticated && (
          <Button content="Login" primary onClick={() => setOpen(true)} />
        )
      }
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
          <Button content="Cancel" onClick={init} secondary />
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
