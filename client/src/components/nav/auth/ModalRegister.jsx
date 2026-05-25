import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import "./ModalRegister.css";
import { register_action } from "../../../actions/auth_actions";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "./ImageUpload";
import isEmail from "validator/lib/isEmail";
import { toastr } from "react-redux-toastr";

export default function ModalRegister() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  function getFile(file) {
    setInputs({ ...inputs, image: file });
  }

  useEffect(() => {
    if (authenticated) onClose();
  }, [authenticated]);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  function submitForm(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("firstName", inputs.firstName);
    formData.append("lastName", inputs.lastName);

    if (isEmail(inputs.email)) {
      formData.append("email", inputs.email);
    } else {
      toastr.error("error", "your email is not valid");
      return;
    }

    if (inputs.password.length > 4) {
      formData.append("password", inputs.password);
    } else {
      toastr.error("error", "your password should be more than 4 characters");
      return;
    }

    formData.append("image", inputs.image);
    dispatch(register_action(formData));
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Register
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={submitForm}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleInputChange}
                    value={inputs.firstName}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleInputChange}
                    value={inputs.lastName}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Profile Picture</FormLabel>
                  <ImageUpload
                    id="image"
                    className="productForm_picBtn"
                    getFile={getFile}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    value={inputs.email}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={inputs.password}
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter gap={3}>
              <Button variant="ghost" onClick={onClose} width="50%">
                Cancel
              </Button>
              <Button
                colorScheme="green"
                type="submit"
                isLoading={loading}
                width="50%"
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
