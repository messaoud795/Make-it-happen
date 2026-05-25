import React, { useEffect } from "react";
import logo from "../../../pictures/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Box,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons"; // Run `npm i @chakra-ui/icons@^1.1.7 --legacy-peer-deps` if you want arrows
import "./Header.css";
import ModalLogin from "../auth/ModalLogin";
import ModalRegister from "../auth/ModalRegister";
import { Link, useHistory } from "react-router-dom";
import { loadProfile, logout_action } from "../../../actions/auth_actions";

export default function Header() {
  const { authenticated, profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleLogout() {
    await dispatch(logout_action());
  }

  useEffect(() => {
    if (authenticated) dispatch(loadProfile());
    else history.push(history.location.pathname);
  }, [dispatch, authenticated, history]);

  const avatarSrc = profile?.image
    ? profile.image.startsWith("http")
      ? profile.image
      : `/${profile.image}`
    : undefined;

  return (
    <Flex
      className="Header"
      justifyContent="space-between"
      alignItems="center"
      p={4}
      borderBottom="1px solid #e2e8f0"
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Image
          src={logo}
          alt="logo"
          boxSize="40px"
          borderRadius="full"
          mr={2}
        />
        <Text fontWeight="bold" fontSize="lg" color="gray.700">
          Make it happen
        </Text>
      </Link>

      <HStack spacing={4}>
        {!authenticated && (
          <HStack spacing={2}>
            <ModalLogin />
            <ModalRegister />
          </HStack>
        )}

        {authenticated && (
          <Box className="header__functions">
            <Menu placement="bottom-end">
              <MenuButton style={{ cursor: "pointer" }}>
                <HStack spacing={1}>
                  <Avatar
                    size="sm"
                    src={avatarSrc}
                    name={`${profile?.firstName || ""} ${profile?.lastName || ""}`}
                  />
                  <ChevronDownIcon color="gray.500" />
                </HStack>
              </MenuButton>
              <MenuList minWidth="150px">
                <MenuItem onClick={() => history.push("/profile")}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={() => history.push("/settings")}>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout} color="red.500">
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}
      </HStack>
    </Flex>
  );
}
