import React, { useState } from "react";
import { Button, Form, Icon, Modal } from "semantic-ui-react";
import "./ModalRegister.css";
import { register_action } from "../../../actions/auth_actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ImageUpload from "./ImageUpload";

export default function ModalRegister({ open, setOpen }) {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: null,
  });
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  //get the image file
  function getFile(file) {
    setInputs({ ...inputs, image: file });
  }
  const submitForm = (e) => {
    e.preventDefault();
    console.log(inputs);
    const formData = new FormData();
    //include state different from null for the update request
    formData.append("firstName", inputs.firstName);
    formData.append("lastName", inputs.lastName);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("image", inputs.image);
    console.log(formData);
    dispatch(register_action(formData));
  };
  if (authenticated) {
    setOpen(false);
    history.push("/field");
  }
  return (
    <Modal
      className="ModalRegister"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Create your account</Modal.Header>
      <Modal.Content>
        <Form onSubmit={submitForm}>
          <Form.Field required>
            <input
              placeholder="First Name"
              name="firstName"
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
              value={inputs.firstName}
            />
          </Form.Field>
          <Form.Field>
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
              value={inputs.lastName}
            />
          </Form.Field>
          <ImageUpload
            id="image"
            className="productForm_picBtn"
            getFile={getFile}
          />{" "}
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
            loading={loading}
            onClick={submitForm}
            positive
          />
        </Form>
      </Modal.Content>
      <Modal.Actions className="ModalRegister__social">
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
