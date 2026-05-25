import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
  Code,
  VStack,
} from "@chakra-ui/react";
import { deleteGoal, loadGoals } from "../../actions/goal_actions";

export default function ModalDeleteGoal({
  openModalDelete,
  handleModalDelete,
  GoalData,
}) {
  const dispatch = useDispatch();
  const { loadingGoal, error } = useSelector((state) => state.goal);

  const handleDeleteGoal = async () => {
    await dispatch(deleteGoal(GoalData._id, GoalData.fieldId));
    if (!loadingGoal && !error) {
      dispatch(loadGoals(GoalData.fieldId));
      handleModalDelete();
    }
  };

  return (
    <Modal
      isOpen={openModalDelete}
      onClose={handleModalDelete}
      isCentered
      size="sm"
    >
      <ModalOverlay backdropFilter="blur(4px)" />

      <ModalContent borderRadius="2xl" p={1}>
        <ModalHeader fontSize="lg" fontWeight="bold" color="gray.800">
          Delete Goal Milestone?
        </ModalHeader>
        <ModalCloseButton borderRadius="full" mt={1} />

        <ModalBody>
          <VStack align="stretch" spacing={3}>
            <Text fontSize="sm" color="gray.500" lineHeight="tall">
              Are you sure you want to permanently delete this goal? This action
              will break all nested dependencies cascading below it.
            </Text>

            {GoalData?.description && (
              <Code
                p={3}
                borderRadius="xl"
                colorScheme="red"
                fontSize="xs"
                fontWeight="semibold"
                whiteSpace="pre-wrap"
              >
                "{GoalData.description}"
              </Code>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter gap={2} pt={4}>
          <Button
            onClick={handleModalDelete}
            variant="ghost"
            colorScheme="gray"
            borderRadius="xl"
            fontSize="sm"
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={handleDeleteGoal}
            isLoading={loadingGoal}
            borderRadius="xl"
            fontSize="sm"
            px={5}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
