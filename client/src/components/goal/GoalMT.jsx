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
import ModalAddGoal from "./ModalAddGoal";
import GoalST from "./GoalST";

export default function GoalMT({ data }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { description, startDate, endDate } = data;
  const { goals } = useSelector((state) => state.goal);

  const handleModalDelete = () => setOpenModalDelete(!openModalDelete);
  const handleModalEdit = () => setOpenModalEdit(!openModalEdit);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR");
  };

  return (
    <Box w="100%" className="GoalMT">
      <Box
        p={4}
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderLeft="5px solid"
        borderLeftColor="purple.400"
        borderRadius="xl"
      >
        <Flex direction="column" gap={2}>
          <Flex justify="space-between" align="start" gap={4}>
            <HStack spacing={3} flex="1" align="start">
              <Badge
                colorScheme="purple"
                variant="subtle"
                borderRadius="md"
                px={1.5}
                py={0.5}
                mt={0.5}
              >
                MT
              </Badge>
              <Text
                fontSize="md"
                fontWeight="semibold"
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
                colorScheme="purple"
                onClick={handleModalEdit}
                aria-label="Edit mid-term goal"
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
                aria-label="Delete mid-term goal"
              />
              <ModalDeleteGoal
                openModalDelete={openModalDelete}
                handleModalDelete={handleModalDelete}
                GoalData={data}
              />
            </HStack>
          </Flex>

          <Flex justify="space-between" align="center" pt={1.5}>
            <HStack spacing={1.5} color="gray.400">
              <CalendarIcon boxSize="11px" />
              <Text fontSize="xs" fontWeight="medium">
                {formatDate(startDate)} &rarr; {formatDate(endDate)}
              </Text>
            </HStack>

            <ModalAddGoal
              fieldId={data.fieldId}
              category="short term"
              parentId={data._id}
            />
          </Flex>
        </Flex>
      </Box>

      {/* Sub-Tier Nesting Node Container for Short-Term Components */}
      <VStack
        spacing={3}
        pl={6}
        mt={3}
        align="stretch"
        borderLeft="2px dashed"
        borderColor="gray.200"
      >
        {goals
          ?.filter(
            (goal) =>
              goal.category === "short term" && goal.parentId === data._id,
          )
          .map((goal) => (
            <GoalST key={goal._id} data={{ ...goal }} />
          ))}
      </VStack>
    </Box>
  );
}
