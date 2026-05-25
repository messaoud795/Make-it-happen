import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  Badge,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CalendarIcon } from "@chakra-ui/icons";
import ModalDeleteGoal from "./ModalDeleteGoal";
import ModalEditGoal from "./ModalEditGoal";
import ModalAddAction from "../action/ModalAddAction";
import Action from "../action/Action";

export default function GoalST({ data }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { description, startDate, endDate } = data;
  const { actions } = useSelector((state) => state.action);

  const handleModalDelete = () => setOpenModalDelete(!openModalDelete);
  const handleModalEdit = () => setOpenModalEdit(!openModalEdit);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR");
  };

  return (
    <Box w="100e%" className="GoalST">
      <Box
        p={3.5}
        bg="white"
        border="1px solid"
        borderColor="orange.100"
        borderLeft="4px solid"
        borderLeftColor="orange.300"
        borderRadius="xl"
      >
        <Flex direction="column" gap={2}>
          <Flex justify="space-between" align="start" gap={4}>
            <HStack spacing={2} flex="1" align="start">
              <Badge
                colorScheme="orange"
                variant="subtle"
                borderRadius="md"
                px={1.5}
                py={0.5}
              >
                ST
              </Badge>
              <Text
                fontSize="sm"
                fontWeight="medium"
                color="gray.700"
                lineHeight="short"
              >
                {description}
              </Text>
            </HStack>

            <HStack spacing={0.5}>
              <IconButton
                icon={<EditIcon />}
                size="xs"
                variant="ghost"
                colorScheme="orange"
                onClick={handleModalEdit}
                aria-label="Edit short-term goal"
              />
              <ModalEditGoal
                openModalEdit={openModalEdit}
                handleModalEdit={handleModalEdit}
                GoalData={data}
              />

              <IconButton
                icon={<DeleteIcon />}
                size="xs"
                variant="ghost"
                colorScheme="red"
                onClick={handleModalDelete}
                aria-label="Delete short-term goal"
              />
              <ModalDeleteGoal
                openModalDelete={openModalDelete}
                handleModalDelete={handleModalDelete}
                GoalData={data}
              />
            </HStack>
          </Flex>

          <Flex justify="space-between" align="center" pt={1}>
            <HStack spacing={1.5} color="gray.400">
              <CalendarIcon boxSize="11px" />
              <Text fontSize="xs">
                {formatDate(startDate)} &rarr; {formatDate(endDate)}
              </Text>
            </HStack>

            <ModalAddAction fieldId={data.fieldId} parentId={data._id} />
          </Flex>
        </Flex>
      </Box>

      {/* Target Actions Render Execution Layer */}
      <VStack spacing={2} pl={4} mt={2.5} align="stretch">
        {actions
          ?.filter((action) => action.parentId === data._id)
          .map((action) => (
            <Action key={action._id} data={{ ...action }} />
          ))}
      </VStack>
    </Box>
  );
}
