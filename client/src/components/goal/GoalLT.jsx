import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  Badge,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CalendarIcon } from "@chakra-ui/icons";
import ModalDeleteGoal from "./ModalDeleteGoal";
import ModalEditGoal from "./ModalEditGoal";
import ModalAddGoal from "./ModalAddGoal";
import GoalMT from "./GoalMT";
import { goalPartners } from "../../actions/goal_actions";
import PeersIcon from "../../icons/PeersIcon";

export default function Goal({ data }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { description, startDate, endDate } = data;
  const { goals } = useSelector((state) => state.goal);
  const dispatch = useDispatch();

  const handleModalDelete = () => setOpenModalDelete(!openModalDelete);
  const handleModalEdit = () => setOpenModalEdit(!openModalEdit);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR");
  };

  return (
    <Box w="100%" mb={6} className="GoalLT">
      {/* Primary Outer Strategy Plate */}
      <Box
        p={5}
        bg="white"
        border="1px solid"
        borderColor="gray.100"
        borderLeft="6px solid"
        borderLeftColor="blue.500"
        borderRadius="2xl"
        boxShadow="0 10px 20px -5px rgba(49, 130, 206, 0.05)"
        _hover={{ boxShadow: "0 15px 30px -5px rgba(49, 130, 206, 0.1)" }}
        transition="all 0.2s ease"
      >
        <Flex direction="column" gap={3}>
          <Flex justify="space-between" align="start" gap={4}>
            <HStack spacing={3} flex="1" align="start">
              <Badge
                colorScheme="blue"
                variant="solid"
                borderRadius="md"
                px={2}
                py={0.5}
                mt={1}
              >
                LT
              </Badge>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="gray.800"
                lineHeight="short"
              >
                {description}
              </Text>

              <Tooltip label="Find peers with the same goal" hasArrow>
                <IconButton
                  icon={<PeersIcon />}
                  size="xs"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => dispatch(goalPartners(data._id))}
                  aria-label="Find target goal peers"
                  borderRadius="md"
                  mt={0.5}
                />
              </Tooltip>
            </HStack>

            {/* Admin Controls Panel */}
            <HStack spacing={1} bg="gray.50" borderRadius="lg" p={0.5}>
              <IconButton
                icon={<EditIcon />}
                size="sm"
                variant="ghost"
                colorScheme="blue"
                onClick={handleModalEdit}
                aria-label="Edit long-term goal"
              />
              <ModalEditGoal
                openModalEdit={openModalEdit}
                handleModalEdit={handleModalEdit}
                GoalData={data}
              />

              <IconButton
                icon={<DeleteIcon />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={handleModalDelete}
                aria-label="Delete long-term goal"
              />
              <ModalDeleteGoal
                openModalDelete={openModalDelete}
                handleModalDelete={handleModalDelete}
                GoalData={data}
              />
            </HStack>
          </Flex>

          {/* Timestamp Footer Panel accompanied by an nested element creator */}
          <Flex
            justify="space-between"
            align="center"
            borderTop="1px dashed"
            borderColor="gray.100"
            pt={2.5}
          >
            <HStack spacing={1.5} color="gray.400">
              <CalendarIcon boxSize="12px" />
              <Text fontSize="xs" fontWeight="semibold">
                {formatDate(startDate)} &rarr; {formatDate(endDate)}
              </Text>
            </HStack>

            <ModalAddGoal
              fieldId={data.fieldId}
              category="mid term"
              parentId={data._id}
            />
          </Flex>
        </Flex>
      </Box>

      {/* Sub-Tier Nesting Node Container for Mid-Term Components */}
      <VStack
        spacing={3}
        pl={6}
        mt={3}
        align="stretch"
        borderLeft="2px solid"
        borderColor="gray.100"
      >
        {goals
          ?.filter(
            (goal) =>
              goal.category === "mid term" && goal.parentId === data._id,
          )
          .map((goal) => (
            <GoalMT key={goal._id} data={goal} />
          ))}
      </VStack>
    </Box>
  );
}
