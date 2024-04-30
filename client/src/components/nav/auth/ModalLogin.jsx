import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import "./ModalLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  facebook_login,
  google_login,
  login_action,
} from "../../../actions/auth_actions";
import isEmail from "validator/lib/isEmail";
import { toastr } from "react-redux-toastr";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

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
  //request google login
  const responseSuccesGoogle = (response) => {
    dispatch(google_login({ tokenId: response.tokenId }));
  };
  //request facebook login
  const responseFacebook = (response) => {
    dispatch(
      facebook_login({
        accessToken: response.accessToken,
        userID: response.userID,
      })
    );
  };
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
        <GoogleLogin
          clientId="888276232633-e56suk9n75ci04dfcj7mrcolb318f1sv.apps.googleusercontent.com"
          buttonText="Google"
          onSuccess={responseSuccesGoogle}
          onFailure={() => {}}
          cookiePolicy={"single_host_origin"}
          className="googleBtn"
        />
        <FacebookLogin
          appId="748676669142105"
          autoLoad={false}
          textButton="Facebook"
          callback={responseFacebook}
          icon="fa-facebook"
          cssClass="facebookBtn"
        />
      </Modal.Actions>
    </Modal>
  );
}
