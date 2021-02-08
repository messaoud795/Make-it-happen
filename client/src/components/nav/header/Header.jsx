import React, { useState } from "react";
import logo from "../../../pictures/logo.jpg";
import { useSelector } from "react-redux";
import { Button, Dropdown, Icon, Menu } from "semantic-ui-react";
import "./Header.css";
import ModalLogin from "../auth/ModalLogin";
import ModalRegister from "../auth/ModalRegister";
import { Link } from "react-router-dom";

export default function Header() {
  const { authenticated, firstName } = useSelector((state) => state.auth);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  return (
    <div className="Header">
      <Link to="/" className="Header__logo">
        <img src={logo} alt="logo" className="Header__img" />
        <span className="Header__span">Make it happen</span>
      </Link>
      <div className="Header__auth">
        {!authenticated && (
          <Button content="Login" primary onClick={() => setOpenLogin(true)} />
        )}
        {openLogin && <ModalLogin open={openLogin} setOpen={setOpenLogin} />}
        {!authenticated && (
          <Button
            content="Register"
            positive
            onClick={() => setOpenRegister(true)}
          />
        )}
        {openRegister && (
          <ModalRegister open={openRegister} setOpen={setOpenRegister} />
        )}
      </div>

      {authenticated && (
        <Menu.Item position="right" className="Header__menu">
          <Icon name="user circle" />
          <Dropdown pointing="top right">
            <Dropdown.Menu>
              <Dropdown.Item text="My Profile" icon="user" />
              <Dropdown.Item to="/settings" text="Settings" icon="settings" />
              <Dropdown.Item text="Sign Out" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      )}
    </div>
  );
}
