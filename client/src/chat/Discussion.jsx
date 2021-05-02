import React, { useEffect, useRef, useState } from "react";
import { Icon } from "semantic-ui-react";
import "./Discussion.css";
import { addMsg } from "../actions/chat_actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CHAT_ADD_SUCCESS } from "../actions/actionsTypes";
import Pusher from "pusher-js";
import { parseISO, format } from "date-fns";

export default function Discussion({ partner }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { chats } = useSelector((state) => state.chats);
  const textinput = useRef();
  const lastMsg = useRef();
  const dispatch = useDispatch();
  const partnerId = useParams().partnerId;
  //scroll to the end of the conversation when the page is loaded
  useEffect(() => {
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  //load the chat messages
  useEffect(() => {
    setMessages(
      chats?.filter(
        (chat) =>
          chat.chatUsers[0]?._id === partnerId ||
          chat.chatUsers[1]?._id === partnerId
      )[0]?.messages
    );
  }, [chats, partner?._id, dispatch, partnerId]);

  //scroll down in each update of messages
  useEffect(() => {
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const pusher = new Pusher("22769e8d448bb4cddf2c", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("chats");
    var newMsg = null;
    channel.bind("updated", function (data) {
      newMsg = data;
      if (newMsg) {
        let i = 0;
        while (i < 1) {
          pusher.unbind_all();
          pusher.unsubscribe();
          dispatch({ type: CHAT_ADD_SUCCESS, payload: newMsg });
          i++;
        }
        newMsg = null;
      }
    });
  }, [dispatch]);
  //save the msg with request to the database
  const sendMsg = (e) => {
    e.preventDefault();
    let data = { text, partnerId: partner._id, timestamp: Date.now() };
    dispatch(addMsg(data));
    setText("");
    textinput.current.focus();
  };

  return (
    <div className="discussion">
      <div className="discussion__header">
        <img
          src={
            partner?.image.startsWith("http")
              ? `${partner?.image}`
              : `/${partner?.image}`
          }
          alt=""
          className="discussion__img"
        />
        <div className="discussion__header-info">
          <p className="discussion__header-user">
            {partner?.firstName + " " + partner?.lastName}
          </p>
          {/* <p className="discussion__header-msg">last seen at</p> */}
        </div>
      </div>
      <div className="discussion__body">
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={
              "discussion__msg " + (msg.userId !== partner._id ? "sent" : " ")
            }
          >
            <p className="discussion__msg-text">{msg.text}</p>
            <p className="discussion__msg-time">
              {format(parseISO(msg.timeStamp), "HH:mm")}
            </p>
          </div>
        ))}
        <div ref={lastMsg}></div>
      </div>
      <div>
        <form onSubmit={sendMsg} className="discussion__footer">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message"
            className="discussion__input"
            ref={textinput}
          />
          <button className="btnSend">
            <Icon name="send" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
