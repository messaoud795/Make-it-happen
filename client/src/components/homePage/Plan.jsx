import React from "react";
import "./Plan.css";
import plan from "../../pictures/plan.jpg";

export default function Plan() {
  return (
    <div className="plan">
      <h1>Make a plan</h1>
      <div className="plan__description">
        <ul>
          <li>
            Set SMART goals with different ranges : long, mid and short term.
          </li>
          <li>
            Set Actions with different priorities according to the Eisenhower
            Matrix, each action is related necesseraly to long term goal.
          </li>
        </ul>
      </div>
      <figure className="plan__fig">
        <img src={plan} alt="plan pic" className="plan__img" />
        <figcaption className="plan__caption">
          “You are never too old to set another goal or to dream a new dream.”
        </figcaption>
      </figure>
    </div>
  );
}
