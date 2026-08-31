import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import ModalAddGoal from "../components/goal/ModalAddGoal";
import GoalLT from "../components/goal/GoalLT";
import { loadGoals } from "../actions/goal_actions";
import { loadActions } from "../actions/action_actions";
import { loadFields } from "../actions/field_actions";
import PlanIcon from "../icons/PlanIcon.jsx";
import "./Goalspage.css";

export default function GoalsPage() {
  const { fieldId } = useParams();
  const dispatch = useDispatch();

  // Safe selectors with fallbacks to avoid undefined crashes
  const fieldState = useSelector((state) => state.field || {});
  const goalState = useSelector((state) => state.goal || state.goals || {});

  const loadingGoal = goalState.loadingGoal;

  // Extract goals safely whether payload is flat or nested
  const rawGoals = goalState.goals || goalState.data || goalState;
  const safeGoalsArray = useMemo(() => {
    if (Array.isArray(rawGoals)) return rawGoals;
    if (rawGoals && Array.isArray(rawGoals.goals)) return rawGoals.goals;
    if (rawGoals && Array.isArray(rawGoals.data)) return rawGoals.data;
    return [];
  }, [rawGoals]);

  // Derive long-term goals efficiently
  const listGoalLT = useMemo(() => {
    return safeGoalsArray.filter(
      (goal) =>
        goal?.category?.toLowerCase() === "long term" ||
        goal?.type?.toLowerCase() === "long term",
    );
  }, [safeGoalsArray]);

  // Safely derive current field name without triggering infinite re-renders
  const fieldName = useMemo(() => {
    const fieldsList = fieldState.name || fieldState.fields || [];
    if (!Array.isArray(fieldsList) || !fieldId) return "";
    const activeField = fieldsList.find(
      (el) => el._id === fieldId || el.id === fieldId,
    );
    return activeField?.name ? activeField.name.toLowerCase() : "";
  }, [fieldState, fieldId]);

  useEffect(() => {
    dispatch(loadFields());
    if (fieldId) {
      dispatch(loadGoals(fieldId));
      dispatch(loadActions(fieldId));
    }
  }, [dispatch, fieldId]);

  return (
    <Box minH="100vh" bg="gray.50/50" py={8} className="GoalsPage">
      <Container
        maxW={{ base: "100%", md: "75%", lg: "70%" }}
        mx="auto"
        px={{ base: 4, md: 0 }}
      >
        {/* Header Section */}
        <Flex
          bg="white"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="sm"
          borderRadius="2xl"
          p={6}
          mb={8}
          align="center"
          justify="space-between"
          className="GoalsPage__header"
        >
          <Flex align="center" gap={4} className="GoalsPage__title">
            <Center
              p={3}
              bg="blue.50"
              borderRadius="xl"
              color="blue.500"
              w="50px"
              h="50px"
              flexShrink={0}
            >
              <PlanIcon color="#3182CE" />
            </Center>

            <Flex direction="column" justify="center" h="50px">
              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="gray.400"
                letterSpacing="wider"
                lineHeight="1"
                mb={1.5}
              >
                Life Area Focus
              </Text>
              <Heading
                as="h1"
                size="lg"
                fontWeight="extrabold"
                color="gray.800"
                textTransform="capitalize"
                lineHeight="1"
              >
                {fieldName || "Loading Area..."}
              </Heading>
            </Flex>
          </Flex>

          <ModalAddGoal
            fieldId={fieldId}
            category="long term"
            parentId={fieldId}
          />
        </Flex>

        {/* Dynamic Card Goals Section Wrapper */}
        <Box className="GoalsPage__goals" w="100%">
          {loadingGoal ? (
            <Center py={16}>
              <Spinner size="xl" color="blue.500" thickness="4px" />
            </Center>
          ) : listGoalLT.length > 0 ? (
            <VStack spacing={6} align="stretch" w="100%">
              {listGoalLT.map((goal) => (
                <GoalLT key={goal._id || goal.id} data={{ ...goal, fieldId }} />
              ))}
            </VStack>
          ) : (
            <Center
              flexDirection="column"
              bg="white"
              border="2px dashed"
              borderColor="gray.200"
              borderRadius="2xl"
              py={16}
              px={6}
              w="100%"
            >
              <Heading
                as="h3"
                size="md"
                color="gray.400"
                fontWeight="semibold"
                mb={2}
              >
                No strategic goals created yet
              </Heading>
              <Text color="gray.400" fontSize="sm">
                Click the add button above to establish your first long term
                milestone.
              </Text>
            </Center>
          )}
        </Box>
      </Container>
    </Box>
  );
}
