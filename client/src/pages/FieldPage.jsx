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
  Progress,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  AddIcon,
  CheckCircleIcon,
  WarningIcon,
  StarIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import confetti from "canvas-confetti";
import { loadFields } from "../actions/field_actions";
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
  const { loadingField, name } = useSelector((state) => state.field);
  const { loadingAction, todayActions } = useSelector((state) => state.action);
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const completedActionsOfToday = useMemo(() => {
    if (!todayActions || !Array.isArray(todayActions)) return 0;

    return todayActions.filter((action) => Boolean(action?.completed?.status))
      .length;
  }, [todayActions]);

  // Calculate Achievement Rate Percentage & Config
  const totalTodayActions = todayActions?.length || 0;
  const achievementRate = useMemo(() => {
    if (totalTodayActions === 0) return 0;
    return Math.round((completedActionsOfToday / totalTodayActions) * 100);
  }, [completedActionsOfToday, totalTodayActions]);

  // Trigger Confetti Party Effect when 100% completion is reached
  useEffect(() => {
    if (achievementRate === 100 && totalTodayActions > 0) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [achievementRate, totalTodayActions]);

  // Dynamic Theme, Icon, and Motivational Message based on Achievement Rate
  const rateConfig = useMemo(() => {
    if (achievementRate === 100 && totalTodayActions > 0) {
      return {
        colorScheme: "purple",
        bg: "purple.50",
        borderColor: "purple.300",
        textColor: "purple.800",
        icon: <CheckCircleIcon color="purple.500" w={5} h={5} />,
        label: "Mastery!",
        alertStatus: "success",
        alertTitle: "🎉 Outstanding Job!",
        alertMsg:
          "Well done! You smashed all your goals today. Keep having fun and enjoying the journey!",
      };
    } else if (achievementRate >= 80) {
      return {
        colorScheme: "green",
        bg: "green.50",
        borderColor: "green.300",
        textColor: "green.800",
        icon: <CheckCircleIcon color="green.500" w={5} h={5} />,
        label: "Almost There!",
        alertStatus: "info",
        alertTitle: "🔥 So Close! Push to the end!",
        alertMsg:
          "You're at 80%+! Give that final push to close out today's wins and enjoy every step!",
      };
    } else if (achievementRate >= 50) {
      return {
        colorScheme: "yellow",
        bg: "yellow.50",
        borderColor: "yellow.300",
        textColor: "yellow.800",
        icon: <StarIcon color="yellow.500" w={5} h={5} />,
        label: "Halfway There!",
        alertStatus: "warning",
        alertTitle: "🚀 Halfway done! Finish the rest!",
        alertMsg:
          "You crossed 50%! Keep up the great momentum to finish the rest, and always remember to enjoy the journey!",
      };
    } else if (achievementRate > 0) {
      return {
        colorScheme: "orange",
        bg: "orange.50",
        borderColor: "orange.300",
        textColor: "orange.800",
        icon: <TimeIcon color="orange.500" w={5} h={5} />,
        label: "Getting Started",
        alertStatus: "info",
        alertTitle: "⚡ Momentum Started!",
        alertMsg:
          "Great start! Keep building up your flow step by step and have fun along the way.",
      };
    } else if (totalTodayActions > 0) {
      // Starting the day with 0% progress
      return {
        colorScheme: "blue",
        bg: "blue.50",
        borderColor: "blue.200",
        textColor: "blue.700",
        icon: <TimeIcon color="blue.400" w={5} h={5} />,
        label: "Fresh Start",
        alertStatus: "info",
        alertTitle: "🚀 Ready to own your day?",
        alertMsg:
          "Every great journey begins with a single step. Pick your first action and let's have fun making progress today!",
      };
    }

    // Default state when no actions are scheduled yet
    return {
      colorScheme: "gray",
      bg: "gray.50",
      borderColor: "gray.200",
      textColor: "gray.600",
      icon: <WarningIcon color="gray.400" w={5} h={5} />,
      label: "No Actions",
      alertStatus: "info",
      alertTitle: "🌟 A clean slate ahead!",
      alertMsg:
        "You have no actions set for today. Add a few goals to get started and enjoy the journey!",
    };
  }, [achievementRate, totalTodayActions]);

  // Tracked days, hours, and minutes remaining until the 27th
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    dispatch(loadFields());
    dispatch(loadTodayActions());

    const calculateMonthlyCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();

      // Target: 27th of the current month at 23:59:59
      let targetDate = new Date(currentYear, currentMonth, 26, 23, 59, 59);

      if (now > targetDate) {
        targetDate = new Date(currentYear, currentMonth + 1, 26, 23, 59, 59);
      }

      const diffTime = targetDate - now;

      const daysRemaining = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor(
        (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutesRemaining = Math.floor(
        (diffTime % (1000 * 60 * 60)) / (1000 * 60),
      );

      setTimeLeft({
        days: daysRemaining,
        hours: hoursRemaining,
        minutes: minutesRemaining,
      });
    };

    calculateMonthlyCountdown();
    const timer = setInterval(calculateMonthlyCountdown, 30000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const handleAddField = () => {
    setOpenModalAdd(!openModalAdd);
  };

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
                {timeLeft.hours}h {timeLeft.minutes.toString().padStart(2, "0")}
                m
              </StatNumber>
            </Stat>
          </Box>
        </HStack>
      </Flex>

      {/* Dynamic Encouragement & Progress Banner at Top */}
      <Alert
        status={rateConfig.alertStatus}
        variant="solid"
        borderRadius="xl"
        mb={8}
        p={5}
        boxShadow="md"
      >
        <AlertIcon w={6} h={6} />
        <Box flex="1" ml={2}>
          <AlertTitle fontSize="lg" fontWeight="extrabold">
            {rateConfig.alertTitle}
          </AlertTitle>
          <AlertDescription fontSize="md" mt={1} display="block">
            {rateConfig.alertMsg}
          </AlertDescription>
        </Box>
      </Alert>

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
          {/* Achievement Rate Card */}
          <Box
            p={4}
            mb={5}
            borderRadius="xl"
            bg={rateConfig.bg}
            border="1px solid"
            borderColor={rateConfig.borderColor}
            boxShadow="sm"
          >
            <Flex justify="space-between" align="center" mb={2}>
              <HStack spacing={2}>
                {rateConfig.icon}
                <Text
                  fontWeight="bold"
                  fontSize="md"
                  color={rateConfig.textColor}
                >
                  Achievement Rate
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Badge
                  colorScheme={rateConfig.colorScheme}
                  borderRadius="full"
                  px={2}
                >
                  {rateConfig.label}
                </Badge>
                <Text
                  fontWeight="extrabold"
                  fontSize="lg"
                  color={rateConfig.textColor}
                >
                  {achievementRate}%
                </Text>
              </HStack>
            </Flex>

            {/* Smooth Progress Bar */}
            <Progress
              value={achievementRate}
              colorScheme={rateConfig.colorScheme}
              size="sm"
              borderRadius="full"
              hasStripe
              isAnimated
            />

            <Text fontSize="xs" color="gray.500" mt={2} textAlign="right">
              {completedActionsOfToday} of {totalTodayActions} actions completed
            </Text>
          </Box>

          <Heading
            as="h2"
            size="md"
            color="gray.700"
            mb={4}
            pb={2}
            borderBottom="2px solid"
            borderColor="gray.100"
          >
            Today's Actions
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
