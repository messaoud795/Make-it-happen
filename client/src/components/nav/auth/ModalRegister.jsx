import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import "./ModalRegister.css";
import { register_action } from "../../../actions/auth_actions";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "./ImageUpload";
import isEmail from "validator/lib/isEmail";
import { toastr } from "react-redux-toastr";

export default function ModalRegister() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: null,
  });
  const [open, setOpen] = useState(false);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //get the image file
  function getFile(file) {
    setInputs({ ...inputs, image: file });
  }
  useEffect(() => {
    if (authenticated) setOpen(false);
  }, [authenticated]);

  function submitForm(e) {
    e.preventDefault();
    const formData = new FormData();
    //include state different from null for the update request
    formData.append("firstName", inputs.firstName);
    formData.append("lastName", inputs.lastName);
    if (isEmail(inputs.email)) formData.append("email", inputs.email);
    else {
      toastr.error("error", "your email is not valid");
      return;
    }

    if (inputs.password.length > 4)
      formData.append("password", inputs.password);
    else {
      toastr.error("error", "your password should be more than 4 caracters");
      return;
    }
    formData.append("image", inputs.image);
    dispatch(register_action(formData));
  }

  return (
    <Modal
      className="ModalRegister"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={!authenticated && <Button content="Register" positive />}
    >
      <Modal.Header>Create your account</Modal.Header>
      <Modal.Content>
        <Form onSubmit={submitForm}>
          <Form.Field>
            <input
              required={true}
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
              required
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
          />
          <Form.Field required>
            <input
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
              value={inputs.email}
              required
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
              required
            />
          </Form.Field>
          <Button content=" Cancel" onClick={() => setOpen(false)} secondary />
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
    </Modal>
  );
}
