import React, { useEffect, useState } from "react";
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

export default function GoalsPage(props) {
  const [fieldName, setFieldName] = useState("");
  const [listGoalLT, setListGoalLT] = useState([]);

  const field = useSelector((state) => state.field);
  const { goals, loadingGoal } = useSelector((state) => state.goal);
  const fieldId = useParams().fieldId;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFields());
  }, [dispatch]);

  useEffect(() => {
    if (field?.name && fieldId) {
      const activeField = field.name.find((el) => el._id === fieldId);
      if (activeField) {
        setFieldName(activeField.name.toLowerCase());
      }
    }
    dispatch(loadGoals(fieldId));
    dispatch(loadActions(fieldId));
  }, [dispatch, fieldId, field?.name]);

  useEffect(() => {
    if (goals) {
      setListGoalLT(goals.filter((goal) => goal.category === "long term"));
    }
  }, [goals]);

  return (
    <Box minH="100vh" bg="gray.50/50" py={8} className="GoalsPage">
      {/* Responsive constraints applied below:
        Occupies 70% width on large desktop viewports, 75% on medium scales, 
        and snaps safely to full-width coverage on standard mobile displays.
      */}
      <Container
        maxW={{ base: "100%", md: "75%", lg: "70%" }}
        mx="auto"
        px={{ base: 4, md: 0 }}
      >
        {/* Transparent Dashboard Header Base Layout Wrapper */}
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
          {/* Outer flex container maps standard central items line paths */}
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

            {/* Swapped text layout to a Flex container set to justify="center".
              This forces the label text blocks to align completely center vertically with your icon box.
            */}
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
          ) : listGoalLT?.length > 0 ? (
            <VStack spacing={6} align="stretch" w="100%">
              {listGoalLT.map((goal) => (
                <GoalLT key={goal._id} data={{ ...goal, fieldId }} />
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
