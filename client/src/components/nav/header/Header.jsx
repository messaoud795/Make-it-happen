import React, { useEffect } from "react";
import logo from "../../../pictures/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import "./Header.css";
import ModalLogin from "../auth/ModalLogin";
import ModalRegister from "../auth/ModalRegister";
import { Link, useHistory } from "react-router-dom";
import { loadProfile, logout_action } from "../../../actions/auth_actions";

export default function Header() {
  const { authenticated, profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout_action());
  };

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(loadProfile());
  }, [dispatch]);

  return (
    <div className="Header">
      <Link to="/" className="Header__logo">
        <img src={logo} alt="logo" className="Header__img" />
        <span className="Header__span">Make it happen</span>
      </Link>

      <div className="Header__auth">
        <ModalLogin />
        <ModalRegister />
      </div>

      {authenticated && (
        <div className="header__functions">
          <Icon
            name="chat"
            onClick={() => history.push(`/chat/`)}
            className="header__chat"
          />
          <Menu.Item position="right" className="Header__menu">
            {profile?.image ? (
              <img src={`/${profile?.image}`} alt="" className="Header__img" />
            ) : (
              <Icon name="user circle" />
            )}
            <Dropdown pointing="top right" className="header__dropdown ">
              <Dropdown.Menu>
                <Dropdown.Item text="My Profile" icon="user" />
                <Dropdown.Item to="/settings" text="Settings" icon="settings" />
                <Dropdown.Item
                  text="Sign Out"
                  icon="power"
                  onClick={handleLogout}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </div>
      )}
    </div>
  );
}
