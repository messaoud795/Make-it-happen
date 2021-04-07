import React from "react";
import "./Synergy.css";
import peers from "../../pictures/peers.jpg";
import chat from "../../pictures/chat.mp4";

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
          </video>{" "}
          <p className="synergy__text">
            You find suggestions of profiles that have the same goal as you,
            after you swith your goal to public mode. You can Chat with them and
            cooperate together towards your goals.
          </p>
        </div>{" "}
      </div>
    </div>
  );
}
