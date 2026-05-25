import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { toastr } from "react-redux-toastr";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { editGoal, loadGoals } from "../../actions/goal_actions";
import "react-datepicker/dist/react-datepicker.css";

export default function ModalEditGoal({
  openModalEdit,
  handleModalEdit,
  GoalData,
}) {
  const { category } = GoalData;
  const { loadingGoal, error } = useSelector((state) => state.goal);

  // Fallback initializations to ensure DatePicker stability
  const [description, setDescription] = useState(GoalData.description || "");
  const [startDate, setStartDate] = useState(
    GoalData.startDate ? new Date(GoalData.startDate) : new Date(),
  );
  const [endDate, setEndDate] = useState(
    GoalData.endDate ? new Date(GoalData.endDate) : new Date(),
  );
  const [status, setStatus] = useState(GoalData.status || "private");

  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();

    // Context-dependent date range verification
    if (
      category === "long term" &&
      startDate.getFullYear() - endDate.getFullYear() >= 0
    ) {
      toastr.error(
        "Error",
        "Please enter an end date superior to the start date",
      );
      return;
    }

    if (
      category === "mid term" &&
      startDate.getMonth() - endDate.getMonth() >= 0
    ) {
      toastr.error(
        "Error",
        "Please enter an end date superior to the start date",
      );
      return;
    }

    const data = {
      id: GoalData._id,
      description,
      startDate,
      endDate,
      status,
    };

    await dispatch(editGoal(data));

    if (!loadingGoal && !error) {
      handleModalEdit();
      dispatch(loadGoals(GoalData.fieldId));
    }
  };

  // Color matching configuration synchronized with standard tier visual styles
  const getColorScheme = () => {
    if (category === "long term") return "blue";
    if (category === "mid term") return "purple";
    return "orange";
  };

  return (
    <Modal
      isOpen={openModalEdit}
      onClose={handleModalEdit}
      isCentered
      size="md"
    >
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" p={2}>
        <ModalHeader
          fontSize="xl"
          fontWeight="bold"
          color="gray.800"
          textTransform="capitalize"
        >
          Update {category} Goal
        </ModalHeader>
        <ModalCloseButton borderRadius="full" mt={2} />

        <form onSubmit={submitForm}>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              {/* Goal Description Input Area */}
              <FormControl isRequired>
                <FormLabel fontWeight="semibold" color="gray.600">
                  Description
                </FormLabel>
                <Input
                  name="description"
                  placeholder="Update goal statement"
                  focusBorderColor={`${getColorScheme()}.400`}
                  borderRadius="xl"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              {/* Sequential Date Configuration Pickers */}
              <HStack spacing={4} width="100%" align="start">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold" color="gray.600">
                    Start Date
                  </FormLabel>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <Input
                        borderRadius="xl"
                        focusBorderColor={`${getColorScheme()}.400`}
                      />
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="semibold" color="gray.600">
                    End Date
                  </FormLabel>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <Input
                        borderRadius="xl"
                        focusBorderColor={`${getColorScheme()}.400`}
                      />
                    }
                  />
                </FormControl>
              </HStack>

              {/* Privacy Setting Toggles */}
              <FormControl as="fieldset">
                <FormLabel as="legend" fontWeight="semibold" color="gray.600">
                  Goal Privacy
                </FormLabel>
                <RadioGroup
                  onChange={setStatus}
                  value={status}
                  colorScheme={getColorScheme()}
                >
                  <HStack spacing={6} py={1}>
                    <Radio value="private" fontWeight="medium">
                      Private
                    </Radio>
                    <Radio value="public" fontWeight="medium">
                      Public
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button
              onClick={handleModalEdit}
              variant="ghost"
              borderRadius="xl"
              colorScheme="gray"
            >
              Cancel
            </Button>
            <Button
              colorScheme={getColorScheme()}
              type="submit"
              borderRadius="xl"
              isLoading={loadingGoal}
              px={6}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
