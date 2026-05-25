import React, { useState } from "react";
import {
  Checkbox,
  Box,
  Flex,
  Text,
  IconButton,
  HStack,
  Badge,
} from "@chakra-ui/react";
// 1. Swapped semantic icons out for native Chakra Icons
import { EditIcon, DeleteIcon, TimeIcon } from "@chakra-ui/icons";
import "./Action.css";
import ModalDeleteAction from "./ModalDeleteAction";
import ModalEditAction from "./ModalEditAction";
import { format } from "date-fns";
import {
  editAction,
  loadActions,
  loadTodayActions,
} from "../../actions/action_actions";
import { useDispatch } from "react-redux";

export default function Action({ data }) {
  const { description, startDate, priority, type, completed, _id } = data;
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const dispatch = useDispatch();

  const handleModalDelete = (e) => {
    e.stopPropagation();
    setOpenModalDelete(!openModalDelete);
  };

  const handleModalEdit = (e) => {
    e.stopPropagation();
    setOpenModalEdit(!openModalEdit);
  };

  const updateCompletedStatus = (e) => {
    e.stopPropagation();
    dispatch(
      editAction({
        id: _id,
        completed: {
          status: !completed.status,
          completionDate: new Date(),
        },
      }),
    );
    dispatch(loadActions(data.fieldId));
    dispatch(loadTodayActions());
  };

  const getThemeColors = () => {
    if (completed.status)
      return {
        border: "green.400",
        bg: "green.50",
        glow: "rgba(72, 187, 120, 0.15)",
      };
    const p = priority?.toLowerCase();
    if (p === "high")
      return {
        border: "red.400",
        bg: "red.50",
        glow: "rgba(245, 101, 101, 0.15)",
      };
    if (p === "medium")
      return {
        border: "orange.400",
        bg: "orange.50",
        glow: "rgba(237, 137, 54, 0.15)",
      };
    return {
      border: "gray.300",
      bg: "gray.50",
      glow: "rgba(160, 174, 192, 0.1)",
    };
  };

  const colors = getThemeColors();

  return (
    <Box
      className="action__glass-card"
      w="100%"
      p={6}
      mb={4}
      bg={completed.status ? colors.bg : "white"}
      border="1px solid"
      borderColor={completed.status ? "green.200" : "gray.100"}
      borderLeft="6px solid"
      borderLeftColor={colors.border}
      borderRadius="2xl"
      boxShadow={`0 10px 25px -5px ${colors.glow}, 0 8px 10px -6px rgba(0,0,0,0.03)`}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: `0 20px 35px -5px ${colors.glow}, 0 12px 16px -8px rgba(0,0,0,0.05)`,
        borderColor: completed.status ? "green.300" : "gray.200",
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <Flex direction="column" gap={4} w="100%">
        {/* Main Row: Checkbox, Text Description, and Management Controls */}
        <Flex
          width="100%"
          alignItems="start"
          justifyContent="space-between"
          gap={4}
        >
          <HStack spacing={4} alignItems="start" flex="1">
            <Checkbox
              id={`cb-${_id}`}
              isChecked={completed.status}
              onChange={updateCompletedStatus}
              colorScheme="green"
              size="lg"
              mt="3px"
              transform="scale(1.2)"
              borderRadius="md"
            />
            <Text
              className="action__description"
              color={completed.status ? "gray.400" : "gray.800"}
              fontWeight="bold"
              fontSize="lg"
              lineHeight="base"
              letterSpacing="wide"
            >
              {description}
            </Text>
          </HStack>

          {/* Quick Control Buttons Panel - Now with clean native Chakra icons */}
          <HStack spacing={1} shrink={0} bg="gray.50" borderRadius="xl" p={1}>
            <IconButton
              icon={<EditIcon />}
              size="sm"
              variant="ghost"
              colorScheme="blue"
              onClick={handleModalEdit}
              aria-label="Edit action"
              borderRadius="lg"
            />
            <ModalEditAction
              openModalEdit={openModalEdit}
              handleModalEdit={handleModalEdit}
              data={data}
            />

            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={handleModalDelete}
              aria-label="Delete action"
              borderRadius="lg"
            />
            <ModalDeleteAction
              openModalDelete={openModalDelete}
              handleModalDelete={handleModalDelete}
              data={data}
            />
          </HStack>
        </Flex>

        {/* Footer Row: Clean separation of categories and timestamps */}
        <Flex
          justify="space-between"
          alignItems="center"
          borderTop="1px dashed"
          borderColor="gray.100"
          pt={3}
        >
          <HStack spacing={3}>
            <Badge
              variant="solid"
              bg={
                completed.status
                  ? "green.500"
                  : `${colors.border.split(".")[0]}.500`
              }
              color="white"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="extrabold"
              letterSpacing="wider"
            >
              {priority}
            </Badge>

            <Badge
              variant="subtle"
              colorScheme="purple"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="bold"
            >
              {type}
            </Badge>
          </HStack>

          {/* Clean Clock Display Format with Native Time Icon */}
          <HStack spacing={1.5} color="gray.400">
            <TimeIcon boxSize="3.5px" />
            <Text fontSize="xs" fontWeight="bold" letterSpacing="wide">
              {format(new Date(startDate), "HH:mm")} &bull;{" "}
              {format(new Date(startDate), "dd MMM")}
            </Text>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
