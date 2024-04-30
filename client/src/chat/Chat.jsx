import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadChats } from "../actions/chat_actions";
import "./Chat.css";
import Discussion from "./Discussion";
import Sidebar from "./Sidebar";

export default function Chat() {
  const { partners } = useSelector((state) => state.goal);
  const partnerId = useParams().partnerId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadChats());
  }, [dispatch]);

  return (
    <div className="chat">
      <Sidebar />
      <Discussion
        partner={partners?.filter((partner) => partner._id === partnerId)[0]}
      />
    </div>
  );
}
