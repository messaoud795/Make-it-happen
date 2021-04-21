import React from "react";
import { Icon } from "semantic-ui-react";
import "./Footer.css";
import logo from "../../pictures/logo.jpg";
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src={logo} alt="logo" className="footer__img" />
        <span className="footer__span">Make it happen</span>
      </div>
      <div className="footer__info">
        <div className="footer__contact">
          <h3>Contact</h3>
          <p>
            <Icon name="mail" className="footer__icon" />
            nabil.massaoud@yahoo.com
          </p>
          <p>
            <Icon name="linkedin" className="footer__icon" />
            https://www.linkedin.com/in/nabil-messaoud-987457111/
          </p>
        </div>
        <div className="footer__copyright">
          <h3>Development</h3>
          <p>Built by Nabil Messaoud in 2021</p>
        </div>
      </div>
    </div>
  );
}
