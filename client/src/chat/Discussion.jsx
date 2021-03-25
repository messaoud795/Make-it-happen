import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import "./Discussion.css";
import Editor from "./Editor";

export default function Discussion() {
  const [text, setText] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + e.native);
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
        <span>{text}</span>
      </div>
      <div className="discussion__footer">
        <form>
          <input
            set="apple"
            type="text"
            value={text}
            onChange={addEmoji}
            placeholder="Type your message"
            className="discussion__input"
          />
          <span className="discussion__emojiPicker">
            <Icon
              name="smile outline"
              onClick={() => setOpenEmoji(!openEmoji)}
              className="smile"
            />
            {openEmoji && (
              <Editor onChange={(html) => setText(text + html)}></Editor>
              // <Picker
              //   onSelect={(e) => setText(text + e.native)}
              //   title="Pick your emoji…"
              //   emoji="point_up"
              //   className="emojiPicker1"
              //   style={{ position: "absolute", bottom: "30px", right: "20px" }}
              // />
            )}
          </span>
          <Button>
            <Icon onClick={handleSubmit} name="send" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
