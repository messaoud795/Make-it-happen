import React from "react";
import "./Synergy.css";
import peers from "../../pictures/peers.jpg";
import chat from "../../pictures/chat.mp4";
import { Icon } from "semantic-ui-react";

export default function Synergy() {
  return (
    <div className="synergy">
      <img src={peers} alt="" className="synergy__img" />
      <div className="synergy__description">
        <h1>Find peers</h1>
        <div className="synergy__video">
          <video className="synergy__video-content" autoPlay muted loop>
            <source src={chat} type="video/mp4" />
            Your browser is not supported
          </video>
          <div className="synergy__text">
            <p>
              <Icon name="check" className="synergy__icon" />
              Find suggestions of people with similar goals
            </p>
            <p>
              <Icon name="check" className="synergy__icon" /> Chat with them
            </p>
            <p>
              <Icon name="check" className="synergy__icon" />
              Pay with credit card in a secure way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
