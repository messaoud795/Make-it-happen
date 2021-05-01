import React, { useEffect, useRef, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import "./Discussion.css";
import InputEmoji from "react-input-emoji";
import { addMsg } from "../actions/chat_actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

export default function Discussion({ partner }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { chats } = useSelector((state) => state.chats);
  // const { partners } = useSelector((state) => state.goal);
  const textinput = useRef();
  const lastMsg = useRef();
  const dispatch = useDispatch();
  const partnerId = useParams().partnerId;

  useEffect(() => {
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    setMessages(
      chats?.filter(
        (chat) =>
          chat.chatUsers[0]?._id === partnerId ||
          chat.chatUsers[1]?._id === partnerId
      )[0]?.messages
    );
  }, [chats, partner?._id, dispatch, partnerId]);

  useEffect(() => {
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMsg = () => {
    let data = { text, partnerId: partner._id, timestamp: Date.now() };
    dispatch(addMsg(data));
    textinput.current.value = "";
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
              {new Date(msg.timeStamp).toLocaleTimeString().slice(0, 5)}
            </p>
          </div>
        ))}
        <div ref={lastMsg}></div>
      </div>
      <div className="discussion__footer">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter={false}
          placeholder="Type a message"
          className="discussion__input"
          ref={textinput}
        />
        <Button onClick={sendMsg}>
          <Icon name="send" />
          Send
        </Button>
      </div>
    </div>
  );
}
