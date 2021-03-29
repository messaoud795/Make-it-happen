import React, { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import "./Discussion.css";
import InputEmoji from "react-input-emoji";
import { addMsg, loadMsg } from "../actions/msg_actions";
import { useDispatch } from "react-redux";

export default function Discussion({ partner }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMsg());
  }, [dispatch]);

  const sendMsg = () => {
    let data = { text, partnerId: partner._id, timestamp: Date.now() };
    dispatch(addMsg(data));
  };

  return (
    <div className="discussion">
      <div className="discussion__header">
        <img src={`/${partner?.image}`} alt="" className="discussion__img" />
        <div className="discussion__header-info">
          <p className="discussion__header-user">
            {partner?.firstName + " " + partner?.lastName}
          </p>
          <p className="discussion__header-msg">last seen at</p>
        </div>
      </div>
      <div className="discussion__body">
        <div className="discussion__msg">
          <p className="discussion__msg-text">this a message</p>
          <p className="discussion__msg-time">{new Date().toLocaleString()}</p>
        </div>
        <div className="discussion__msg sent">
          <p className="discussion__msg-text">this a message</p>
          <p className="discussion__msg-time">{new Date().toLocaleString()}</p>
        </div>
      </div>
      <div className="discussion__footer">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter={false}
          placeholder="Type a message"
          className="discussion__input"
        />
        <Button onClick={sendMsg}>
          <Icon name="send" />
          Send
        </Button>
      </div>
    </div>
  );
}
