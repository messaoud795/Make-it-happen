import React, { useEffect, useRef, useState } from "react";
import { Icon } from "semantic-ui-react";
import "./Discussion.css";
import { addMsg } from "../actions/chat_actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CHAT_ADD_SUCCESS } from "../actions/actionsTypes";
import { parseISO, format } from "date-fns";
import { io } from "socket.io-client";

export default function Discussion({ partner }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const { chats } = useSelector((state) => state.chats);
  const textinput = useRef();
  const lastMsg = useRef();
  const dispatch = useDispatch();
  const partnerId = useParams().partnerId;
  // const socket = io("https://make-it-happen-demo.herokuapp.com");
  const socket = io("http://localhost:3000");

  //scroll to the end of the conversation when the page is loaded
  useEffect(() => {
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
    socket.on("messageFromServer", (dataFromServer) => {
      console.log(dataFromServer);
      socket.emit("dataToServer", { data: "Data from the Client!" });
    });
    // eslint-disable-next-line
  }, []);
  socket.on("sendMsg", (newMsg) => {
    console.log("msg received from server", newMsg);
    dispatch({ type: CHAT_ADD_SUCCESS, payload: newMsg });
  });
  //load the chat messages
  useEffect(() => {
    let activeChat = chats?.filter(
      (chat) =>
        chat.chatUsers[0]?._id === partnerId ||
        chat.chatUsers[1]?._id === partnerId
    )[0];
    setChatId(activeChat?._id);
    setMessages(activeChat?.messages);
  }, [chats, partner?._id, dispatch, partnerId]);

  //scroll down in each update of messages
  useEffect(() => {
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // Connected, let's sign-up for to receive messages for this room
  useEffect(() => {
    if (chatId) {
      // socket.on("connect", function () {
      // socket.emit("join-room", chatId);
      //   console.log("chat room created on client side", chatId);
      // });
    }

    // eslint-disable-next-line
  }, [chatId]);

  //save the msg with request to the database
  const sendMsg = (e) => {
    e.preventDefault();
    let data = { text, partnerId: partner._id, timestamp: Date.now() };
    dispatch(addMsg(data));
    // socket.emit("add-msg", data);

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
              : `https://make-it-happen-demo.herokuapp.com/${partner?.image}`
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
              "discussion__msg " + (msg?.userId !== partner._id ? "sent" : " ")
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
