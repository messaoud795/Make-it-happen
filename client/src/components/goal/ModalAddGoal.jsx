import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { toastr } from "react-redux-toastr";
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
  RadioGroup,
  Radio,
  HStack,
  VStack,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { addGoal, loadGoals } from "../../actions/goal_actions";
import "react-datepicker/dist/react-datepicker.css";
import "./ModalAddGoal.css";

export default function ModalAddGoal({ fieldId, category, parentId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState("private");

  const { error, loadingGoal } = useSelector((state) => state.goal);
  const dispatch = useDispatch();

  const handleClose = () => {
    setDescription("");
    setStartDate(new Date());
    setEndDate(new Date());
    setStatus("private");
    onClose();
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Validation Logic
    if (
      category === "long term" &&
      startDate.getFullYear() - endDate.getFullYear() >= 0
    ) {
      toastr.error("Error", "Please enter a valid date range of several years");
      return;
    }

    if (
      category === "mid term" &&
      (endDate.getTime() - startDate.getTime() < 2764800000 ||
        endDate.getTime() - startDate.getTime() > 33177600000)
    ) {
      toastr.error("Error", "Please enter a date range of several months");
      return;
    }

    if (
      category === "short term" &&
      (endDate.getTime() - startDate.getTime() < 604800000 ||
        endDate.getTime() - startDate.getTime() > 2764800000)
    ) {
      toastr.error("Error", "Please enter a valid date range of several weeks");
      return;
    }

    const data = {
      description,
      category,
      startDate,
      endDate,
      status,
      fieldId,
      parentId,
    };

    await dispatch(addGoal(data));
    if (!loadingGoal && !error) {
      dispatch(loadGoals(data.fieldId));
      handleClose();
    }
  };

  // Determine button sizing accent color scheme based on category depth
  const getColorScheme = () => {
    if (category === "long term") return "blue";
    if (category === "mid term") return "purple";
    return "orange";
  };

  return (
    <>
      {/* Universal Declarative Component Activation Trigger Button */}
      <Tooltip label={`Enter ${category} goal`} hasArrow placement="top">
        <IconButton
          icon={<AddIcon />}
          colorScheme={getColorScheme()}
          variant={category === "long term" ? "solid" : "ghost"}
          size={category === "long term" ? "md" : "xs"}
          borderRadius="xl"
          onClick={onOpen}
          aria-label={`Add new ${category} lifecycle node`}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={handleClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl" p={2}>
          <ModalHeader
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
            textTransform="capitalize"
          >
            Enter {category} Goal Data
          </ModalHeader>
          <ModalCloseButton borderRadius="full" mt={2} />

          <form onSubmit={submitForm}>
            <ModalBody>
              <VStack spacing={4} align="stretch">
                {/* Description Input Layer */}
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold" color="gray.600">
                    Description
                  </FormLabel>
                  <Input
                    name="description"
                    placeholder="What do you plan to achieve?"
                    focusBorderColor={`${getColorScheme()}.400`}
                    borderRadius="xl"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>

                {/* Date Selection Grid Layout Panel */}
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

                {/* Visibility Configuration Element */}
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
                onClick={handleClose}
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
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
