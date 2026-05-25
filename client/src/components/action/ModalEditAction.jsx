import React, { useState, useEffect } from "react";
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
  Box,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import {
  editAction,
  loadActions,
  loadTodayActions,
} from "../../actions/action_actions";
import "react-datepicker/dist/react-datepicker.css";
import "./ModalAddAction.css";

export default function ModalEditAction({
  openModalEdit,
  handleModalEdit,
  data,
}) {
  const [details, setDetails] = useState({
    description: "",
    priority: "",
    type: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const { error, loadingAction } = useSelector((state) => state.action);
  const dispatch = useDispatch();

  // Keeps internal editing state synced correctly with passing context properties
  useEffect(() => {
    if (data) {
      setDetails({
        description: data.description || "",
        priority: data.priority || "",
        type: data.type || "",
      });
      setStartDate(data.startDate ? new Date(data.startDate) : new Date());
    }
  }, [data, openModalEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const { description, priority, type } = details;
    const updatePayload = {
      id: data._id,
      description,
      priority,
      type,
      startDate,
    };

    dispatch(editAction(updatePayload));
    if (!loadingAction && !error) {
      handleModalEdit();
      dispatch(loadActions(data.fieldId));
      dispatch(loadTodayActions());
    }
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
        <ModalHeader fontSize="xl" fontWeight="bold" color="gray.800">
          Edit action details
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
                      borderRadius="xl"
                      focusBorderColor="blue.400"
                      value={details.priority}
                      onChange={handleInputChange}
                    >
                      <option value="High">Important and urgent</option>
                      <option value="Medium">Important and not urgent</option>
                      <option value="Low">Not important and urgent</option>
                      <option value="None">Not important and not urgent</option>
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontWeight="semibold" color="gray.600">
                      Type
                    </FormLabel>
                    <Select
                      name="type"
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
              onClick={handleModalEdit}
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
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
