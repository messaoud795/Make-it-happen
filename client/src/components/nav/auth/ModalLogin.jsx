import React, { useEffect, useState } from "react";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import "./ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login_action } from "../../../actions/auth_actions";
import isEmail from "validator/lib/isEmail";
import { toastr } from "react-redux-toastr";

export default function ModalLogin({ props }) {
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
    history.push(history.location.pathname);
  };

  const dispatch = useDispatch();
  async function submitForm(e) {
    e.preventDefault();
    if (isEmail(inputs.email)) await dispatch(login_action(inputs));
    else toastr.error("error", "your email is not valid");
  }
  useEffect(() => {
    if (authenticated && !loading) {
      init();
    }
    // eslint-disable-next-line
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
        {/* <form>
          <input
            type="email"
            class="txtPost"
            placeholder="Post a question?"
            required
          />
          <button class="btnPost btnBlue">Post</button>
        </form> */}
        <Form onSubmit={submitForm}>
          <Form.Field>
            <input
              required
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
              value={inputs.email}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
              value={inputs.password}
              required
            />
          </Form.Field>
          <Button content="Cancel" onClick={init} secondary />
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            loading={loading}
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
