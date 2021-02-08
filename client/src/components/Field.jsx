import React from "react";
import "./Field.css";
import { Icon } from "semantic-ui-react";

export default function Field({ name }) {
  return (
    <div className="Field">
      <div className="Field__operations">
        <Icon name="edit" className="edit" />
        <Icon name="delete" className="delete" />
      </div>

      <span className="Field__text">{name}</span>
    </div>
  );
}
