import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import "./Discussion.css";
import InputEmoji from "react-input-emoji";

export default function Discussion() {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="discussion">
      <div className="discussion__header">
        <Icon name="user circle" className="sidebar__discussion-img"></Icon>
        <div className="discussion__header-info">
          <p className="discussion__header-user">user Name</p>
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
          cleanOnEnter
          placeholder="Type a message"
          className="discussion__input"
        />
        <Button>
          <Icon onClick={handleSubmit} name="send" />
          Send
        </Button>
      </div>
    </div>
  );
}
