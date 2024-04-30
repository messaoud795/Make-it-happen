import React from "react";
import "./Dream.css";
import dream from "../../pictures/dream.mp4";

export default function Dream() {
  return (
    <div className="mission">
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          <source src={dream} type="video/mp4" />
          Your browser is not supported
        </video>
      </div>
      <div className="mission__text">
        <h2 className="mission__text-header">Make your dreams come true</h2>
        <h2 className="mission__text-quote">
          “If You Want Something You Never Had, You Have To Do Something You’ve
          Never Done.”
        </h2>
      </div>
    </div>
  );
}
