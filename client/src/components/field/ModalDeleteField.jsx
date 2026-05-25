import React from "react";
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
  Text,
  Heading,
} from "@chakra-ui/react";
import { deleteField, loadFields } from "../../actions/field_actions";

export default function ModalDeleteField({
  open,
  handleModalDelete,
  name,
  id,
}) {
  const { error } = useSelector((state) => state.field);
  const dispatch = useDispatch();

  const submitDelete = async () => {
    let data = { id: id };
    await dispatch(deleteField(data));
    if (!error) {
      handleModalDelete();
      dispatch(loadFields());
    }
  };

  return (
    <Modal isOpen={open} onClose={handleModalDelete} isCentered size="md">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" p={2}>
        <ModalHeader fontSize="xl" fontWeight="bold" color="gray.800">
          Confirm to delete this field
        </ModalHeader>
        <ModalCloseButton borderRadius="full" mt={2} />

        <ModalBody>
          <Text color="gray.500" mb={2} fontSize="sm" fontWeight="semibold">
            Warning: Deleting this Life Area will remove all associated metrics
            and daily actions.
          </Text>
          <Heading as="h3" size="md" color="red.600" fontWeight="bold" py={2}>
            {name}
          </Heading>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button
            onClick={handleModalDelete}
            variant="ghost"
            borderRadius="xl"
            colorScheme="gray"
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={submitDelete}
            borderRadius="xl"
            px={6}
          >
            Delete Field
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
