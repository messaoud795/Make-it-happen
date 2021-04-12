import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadChats } from "../actions/chat_actions";
import "./Chat.css";
import Discussion from "./Discussion";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import { CHAT_ADD_SUCCESS } from "../actions/actionsTypes";

export default function Chat() {
  const { partners } = useSelector((state) => state.goal);
  const partnerId = useParams().partnerId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadChats());

    // const pusher = new Pusher("22769e8d448bb4cddf2c", {
    //   cluster: "eu",
    // });
    // const channel = pusher.subscribe("chats");
    // var newMsg = null;
    // channel.bind("updated", function (data) {
    //   newMsg = data;
    //   if (newMsg) {
    //     dispatch({ type: CHAT_ADD_SUCCESS, payload: newMsg });
    //     newMsg = null;
    //   }
    // });
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
