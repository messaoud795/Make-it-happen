import React from "react";
import "./Chat.css";
import Discussion from "./Discussion";
import Sidebar from "./Sidebar";

export default function Chat() {
  return (
    <div className="chat">
      <Sidebar />
      <Discussion />
    </div>
  );
}
