import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { addField } from "../../actions/field_actions";

export default function ModalAddField({ open, setOpen }) {
  const [input, setInput] = useState("");
  const { error } = useSelector((state) => state.field);
  const dispatch = useDispatch();

  const handleClose = () => {
    setInput("");
    setOpen(); // Matches your parent handler execution
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let data = { name: input.toUpperCase() };
    await dispatch(addField(data));
    if (!error) {
      setInput("");
      setOpen();
    }
  };

  return (
    <Modal isOpen={open} onClose={handleClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" p={2}>
        <ModalHeader fontSize="xl" fontWeight="bold" color="gray.800">
          Enter the name of the field
        </ModalHeader>
        <ModalCloseButton borderRadius="full" mt={2} />

        <form onSubmit={submitForm}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel fontWeight="semibold" color="gray.600">
                  Field Name
                </FormLabel>
                <Input
                  placeholder="e.g. Health, Career, Finance..."
                  focusBorderColor="blue.400"
                  borderRadius="xl"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button
              onClick={handleClose}
              variant="ghost"
              borderRadius="xl"
              colorScheme="gray"
            >
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" borderRadius="xl" px={6}>
              Create Field
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
