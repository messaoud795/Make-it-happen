import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Box,
  Heading,
  Text,
  Spinner,
  IconButton,
  Grid,
  GridItem,
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { loadFields } from "../actions/field_actions";
import { loadQuote } from "../actions/loadQuote";
import Field from "../components/field/Field";
import ModalAddField from "../components/field/ModalAddField";
import { format } from "date-fns";

import "./FieldPage.css";
import { loadTodayActions } from "../actions/action_actions";
import Action from "../components/action/Action";
import CareerIcon from "../icons/CareerIcon";
import FinanceIcon from "../icons/FinanceIcon";
import HealthIcon from "../icons/HealthIcon";
import FunIcon from "../icons/FunIcon";
import GrowthIcon from "../icons/GrowthIcon";
import RelationsIcon from "../icons/RelationsIcon";

function FieldPage() {
  const dispatch = useDispatch();
  const { quote, author, loadingQuote } = useSelector((state) => state.quote);
  const { loadingField, name } = useSelector((state) => state.field);
  const { loadingAction, todayActions } = useSelector((state) => state.action);
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const completedActionsOfToday = useMemo(() => {
    if (!todayActions || !Array.isArray(todayActions)) return 0;

    return todayActions.filter((action) => Boolean(action?.completed?.status))
      .length;
  }, [todayActions]);

  // Tracked days, hours, and minutes inside component state
  const [timeLeft, setTimeLeft] = useState({
    days: 365,
    hours: 24,
    minutes: 0,
  });

  useEffect(() => {
    dispatch(loadQuote());
    dispatch(loadFields());
    dispatch(loadTodayActions());

    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      let targetDate = new Date(currentYear, 7, 27, 23, 59, 59);

      if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 7, 27, 23, 59, 59);
      }

      const diffTime = targetDate - now;

      // Calculate total breakdown units cleanly
      const daysRemaining = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hoursRemaining = 23 - now.getHours();
      const minutesRemaining = 59 - now.getMinutes();

      setTimeLeft({
        days: daysRemaining,
        hours: hoursRemaining,
        minutes: minutesRemaining,
      });
    };

    calculateCountdown();
    // Run interval checks every 30 seconds to maintain exact minute precision
    const timer = setInterval(calculateCountdown, 30000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const handleAddField = () => {
    setOpenModalAdd(!openModalAdd);
  };

  // Explicit typing stops TypeScript from recursively joining huge Chakra interface states
  const fieldsIcons = {
    CAREER: CareerIcon,
    FINANCE: FinanceIcon,
    HEALTH: HealthIcon,
    GROWTH: GrowthIcon,
    LEISURE: FunIcon,
    RELATIONS: RelationsIcon,
  };

  return (
    <Box className="FieldPage" w="100vw" px={8} py={6} m={0}>
      {/* Top Section: Date & Timers */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={4}
        mb={6}
        w="100%"
      >
        <VStack align="start" spacing={1}>
          <Heading as="h3" size="md" color="gray.500" fontWeight="medium">
            {format(new Date(), "EEEE dd MMMM")}
          </Heading>
        </VStack>

        <HStack spacing={6}>
          <Box
            borderRadius="xl"
            bg="cyan.500"
            color="white"
            py={2}
            px={6}
            boxShadow="md"
            minW="140px"
          >
            <Stat size="sm">
              <StatLabel
                color="cyan.100"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Days Left
              </StatLabel>
              <StatNumber
                textAlign="center"
                fontSize="3xl"
                fontWeight="extrabold"
              >
                {timeLeft.days}
              </StatNumber>
            </Stat>
          </Box>

          <Box
            borderRadius="xl"
            bg="green.500"
            color="white"
            py={2}
            px={6}
            boxShadow="md"
            minW="160px"
          >
            <Stat size="sm">
              <StatLabel
                color="green.100"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Time Left
              </StatLabel>
              <StatNumber
                textAlign="center"
                fontSize="2xl"
                fontWeight="extrabold"
                whiteSpace="nowrap"
              >
                {timeLeft.hours}h
                {timeLeft.minutes?.toString().padStart(2, "0") || "00"}m
              </StatNumber>
            </Stat>
          </Box>
        </HStack>
      </Flex>

      {/* Centered, Larger Inspirational Quote */}
      <Box
        p={5}
        bg="blue.50"
        borderRadius="xl"
        borderLeft="5px solid"
        borderColor="blue.400"
        mb={8}
        w="100%"
      >
        {loadingQuote ? (
          <Flex align="center" justify="center" gap={2} py={2}>
            <Spinner size="sm" color="blue.500" />
            <Text fontSize="md" color="gray.500" fontStyle="italic">
              Fetching your fresh daily inspiration...
            </Text>
          </Flex>
        ) : (
          <VStack spacing={2} textAlign="center" justify="center" w="100%">
            <Text
              fontStyle="italic"
              fontSize="lg"
              fontWeight="medium"
              color="gray.800"
              maxW="4xl"
            >
              "{quote || "Make it happen today. Consistency yields progress."}"
            </Text>
            <Text
              fontWeight="bold"
              color="gray.500"
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              — {author || "Unknown Author"}
            </Text>
          </VStack>
        )}
      </Box>

      {/* Main Side-by-Side Flex Layout */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={30}
        w="100%"
        alignItems="start"
      >
        {/* Left Section: Life Areas */}
        <Box
          w={{ base: "100%", lg: "60%" }}
          className="FieldPage__sectionFields"
        >
          <Flex alignItems="center" mb={6}>
            <Heading as="h2" size="lg" color="gray.800" mr={4}>
              Life Areas :
            </Heading>
            <IconButton
              icon={<AddIcon />}
              colorScheme="blue"
              size="sm"
              borderRadius="full"
              onClick={handleAddField}
              aria-label="Add field"
            />
            <ModalAddField open={openModalAdd} setOpen={handleAddField} />
          </Flex>

          {loadingField ? (
            <Flex justify="center" py={10}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <Grid
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(3, 1fr)"
              gap={5}
              w="100%"
              className="FielPage__fields"
            >
              {name?.map((el) => (
                <GridItem key={el._id} w="100%" minW={0}>
                  <Field id={el._id} name={el.name}>
                    {React.createElement(fieldsIcons[el.name] || Box, {})}
                  </Field>
                </GridItem>
              ))}
            </Grid>
          )}
        </Box>

        {/* Right Section: Actions Panel */}
        <Box w={{ base: "100%", lg: "40%" }} className="FieldPage__actions">
          <Heading
            as="h2"
            size="md"
            color="gray.700"
            mb={4}
            pb={2}
            borderBottom="2px solid"
            borderColor="gray.100"
          >
            Today actions done: {completedActionsOfToday} /{" "}
            {todayActions?.length || 0}
          </Heading>

          {loadingAction ? (
            <Flex justify="center" py={10}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <VStack spacing={4} align="stretch" w="100%">
              {todayActions?.map((action) => (
                <Action key={action._id} action={action} />
              ))}
            </VStack>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default React.memo(FieldPage);
