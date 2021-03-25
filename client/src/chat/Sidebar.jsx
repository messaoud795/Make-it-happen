import React from "react";
import { Icon } from "semantic-ui-react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Discussions</h2>
      <div className="sidebar__discussion">
        <Icon name="user circle" className="sidebar__discussion-img"></Icon>
        <div>
          <p>user Name</p>
          <p>Last message in the discussion</p>
        </div>
      </div>
    </div>
  );
}
