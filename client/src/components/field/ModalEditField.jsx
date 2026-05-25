import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { editField } from "../../actions/field_actions";

export default function ModalEditField({ open, setOpen, id, name }) {
  const [input, setInput] = useState(name);
  const dispatch = useDispatch();

  // Keeps local input state synced smoothly when opening field updates
  useEffect(() => {
    if (open) {
      setInput(name);
    }
  }, [open, name]);

  const submitForm = (e) => {
    e.preventDefault();
    let data = { id: id, name: input.toUpperCase() };
    dispatch(editField(data));
    setOpen(false); // Cleanly triggers modal visibility exit down to parent layer
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} isCentered size="md">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" p={2}>
        <ModalHeader fontSize="xl" fontWeight="bold" color="gray.800">
          Change the name of the field
        </ModalHeader>
        <ModalCloseButton borderRadius="full" mt={2} />

        <form onSubmit={submitForm}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel fontWeight="semibold" color="gray.600">
                  Update Field Title
                </FormLabel>
                <Input
                  placeholder="Enter updated field name"
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
              onClick={() => setOpen(false)}
              variant="ghost"
              borderRadius="xl"
              colorScheme="gray"
            >
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" borderRadius="xl" px={6}>
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
