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
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";
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

export default function ModalLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const { authenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.async);
  const history = useHistory();
  const dispatch = useDispatch();

  const init = () => {
    setInputs({ email: "", password: "" });
    onClose();
    history.push(history.location.pathname);
  };

  async function submitForm(e) {
    e.preventDefault();
    if (isEmail(inputs.email)) {
      await dispatch(login_action(inputs));
    } else {
      toastr.error("error", "your email is not valid");
    }
  }

  useEffect(() => {
    if (authenticated && !loading) {
      init();
    }
  }, [authenticated, loading]);

  const responseSuccesGoogle = (response) => {
    dispatch(google_login({ tokenId: response.tokenId }));
  };

  const responseFacebook = (response) => {
    dispatch(
      facebook_login({
        accessToken: response.accessToken,
        userID: response.userID,
      }),
    );
  };

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Login
      </Button>

      <Modal isOpen={isOpen} onClose={init} isCentered size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent mx={4} borderRadius="xl" boxShadow="2xl" p={2}>
          <ModalHeader fontSize="2xl" fontWeight="bold" color="gray.800" pb={1}>
            Welcome Back
          </ModalHeader>
          <ModalCloseButton top="20px" right="20px" />

          <form onSubmit={submitForm}>
            <ModalBody pt={4}>
              <VStack spacing={5}>
                {/* Email Field Wrapper */}
                <FormControl isRequired>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.600"
                    mb={2}
                  >
                    Email Address
                  </FormLabel>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    value={inputs.email}
                    size="lg"
                    bg="gray.50"
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    _focus={{
                      bg: "white",
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce",
                    }}
                  />
                </FormControl>

                {/* Password Field Wrapper */}
                <FormControl isRequired>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.600"
                    mb={2}
                  >
                    Password
                  </FormLabel>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={inputs.password}
                    size="lg"
                    bg="gray.50"
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    _focus={{
                      bg: "white",
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce",
                    }}
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter
              flexDirection="column"
              alignItems="stretch"
              gap={4}
              pt={6}
            >
              <VStack spacing={2} width="100%">
                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={loading}
                  width="100%"
                  size="lg"
                  fontSize="md"
                  fontWeight="bold"
                  borderRadius="md"
                >
                  Sign In
                </Button>
                <Button
                  variant="ghost"
                  onClick={init}
                  width="100%"
                  size="sm"
                  color="gray.500"
                >
                  Cancel
                </Button>
              </VStack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
