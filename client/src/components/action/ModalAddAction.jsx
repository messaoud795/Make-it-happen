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
  Select,
  Grid,
  GridItem,
  useDisclosure,
  IconButton,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import { addAction, loadActions } from "../../actions/action_actions";
import "react-datepicker/dist/react-datepicker.css";
import "./ModalAddAction.css";

export default function ModalAddAction({ fieldId, parentId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [details, setDetails] = useState({
    description: "",
    priority: "",
    type: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const { error, loadingAction } = useSelector((state) => state.action);
  const dispatch = useDispatch();

  const init = () => {
    setDetails({
      description: "",
      priority: "",
      type: "",
    });
    setStartDate(new Date());
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { description, priority, type } = details;
    const data = {
      description,
      priority,
      type,
      startDate,
      fieldId,
      parentId,
    };

    dispatch(addAction(data));
    if (!loadingAction && !error) {
      init();
      dispatch(loadActions(data.fieldId));
    }
  };

  return (
    <>
      <Tooltip label="Add an action" aria-label="Add action tooltip">
        <IconButton
          icon={<AddIcon />}
          colorScheme="blue"
          onClick={onOpen}
          borderRadius="full"
          aria-label="Add action"
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={init} isCentered size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl" p={2}>
          <ModalHeader fontSize="xl" fontWeight="bold" color="gray.800">
            Enter action details
          </ModalHeader>
          <ModalCloseButton borderRadius="full" mt={2} />

          <form onSubmit={submitForm}>
            <ModalBody>
              <Grid gap={4}>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="semibold" color="gray.600">
                      Description
                    </FormLabel>
                    <Input
                      name="description"
                      placeholder="What needs to be done?"
                      focusBorderColor="blue.400"
                      borderRadius="xl"
                      value={details.description}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormControl isRequired>
                      <FormLabel fontWeight="semibold" color="gray.600">
                        Priority
                      </FormLabel>
                      <Select
                        name="priority"
                        placeholder="Choose priority"
                        borderRadius="xl"
                        focusBorderColor="blue.400"
                        value={details.priority}
                        onChange={handleInputChange}
                      >
                        <option value="High">Important and urgent</option>
                        <option value="Medium">Important and not urgent</option>
                        <option value="Low">Not important and urgent</option>
                        <option value="None">
                          Not important and not urgent
                        </option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontWeight="semibold" color="gray.600">
                        Type
                      </FormLabel>
                      <Select
                        name="type"
                        placeholder="Choose type"
                        borderRadius="xl"
                        focusBorderColor="blue.400"
                        value={details.type}
                        onChange={handleInputChange}
                      >
                        <option value="Daily habit">Daily habit</option>
                        <option value="Weekly habit">Weekly habit</option>
                        <option value="Task">One-time task</option>
                      </Select>
                    </FormControl>
                  </Grid>
                </GridItem>

                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="semibold" color="gray.600">
                      Date & Time
                    </FormLabel>
                    <Box
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="xl"
                      p={2}
                      _focusWithin={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 1px #4299E1",
                      }}
                    >
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeInput
                        timeFormat="HH:mm"
                        dateFormat="dd/MM/yyyy, HH:mm"
                        className="chakra-datepicker-input"
                      />
                    </Box>
                  </FormControl>
                </GridItem>
              </Grid>
            </ModalBody>

            <ModalFooter gap={3}>
              <Button
                onClick={init}
                variant="ghost"
                borderRadius="xl"
                colorScheme="gray"
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                borderRadius="xl"
                isLoading={loadingAction}
                px={6}
              >
                Submit Action
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
