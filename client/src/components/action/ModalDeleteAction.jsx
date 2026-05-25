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
import {
  deleteAction,
  loadActions,
  loadTodayActions,
} from "../../actions/action_actions";

export default function ModalDeleteAction({
  openModalDelete,
  handleModalDelete,
  data,
}) {
  const dispatch = useDispatch();
  const { loadingAction, error } = useSelector((state) => state.action);

  const handleDeleteAction = () => {
    dispatch(deleteAction(data._id));
    if (!loadingAction && !error) {
      handleModalDelete();
      dispatch(loadActions(data.fieldId));
      dispatch(loadTodayActions());
    }
  };

  // Guard clause to prevent rendering if data hasn't loaded yet
  if (!data) return null;

  return (
    <Modal
      isOpen={openModalDelete}
      onClose={handleModalDelete}
      isCentered
      size="md"
    >
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" p={2}>
        <ModalHeader fontSize="xl" fontWeight="bold" color="gray.800">
          Confirm to delete this Goal
        </ModalHeader>
        <ModalCloseButton borderRadius="full" mt={2} />

        <ModalBody>
          <Text color="gray.500" mb={2} fontSize="sm" fontWeight="semibold">
            Are you sure you want to permanently delete this action?
          </Text>
          <Heading as="h3" size="md" color="red.600" fontWeight="medium" py={2}>
            {data.description}
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
            onClick={handleDeleteAction}
            borderRadius="xl"
            isLoading={loadingAction}
            px={6}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
