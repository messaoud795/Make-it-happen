import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "./Chat.css";
import Discussion from "./Discussion";
import Sidebar from "./Sidebar";

export default function Chat() {
  const { partners } = useSelector((state) => state.goal);
  const partnerId = useParams().partnerId;

  return (
    <div className="chat">
      <Sidebar />
      <Discussion
        partner={partners?.filter((partner) => partner._id === partnerId)[0]}
      />
    </div>
  );
}
