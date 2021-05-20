import React from "react";
import { useSelector } from "react-redux";
// import { Icon } from "semantic-ui-react";
import "./Sidebar.css";
import { useHistory } from "react-router";

export default function Sidebar() {
  const { chats } = useSelector((state) => state.chats);
  const { profile } = useSelector((state) => state.auth);
  const history = useHistory();

  const msgSender = (chat) => {
    let msgUserId = chat?.messages[chat.messages.length - 1].userId;
    let userId = profile?._id;
    if (msgUserId === userId) return "You : ";
  };
  return (
    <div className="sidebar">
      <h2>Discussions</h2>
      {chats.map((chat) => (
        <div
          className="sidebar__discussion"
          key={chat._id}
          onClick={() =>
            history.push(`/chat/${partner(chat.chatUsers, profile._id)._id}`)
          }
        >
          <img
            src={
              partner(chat?.chatUsers, profile?._id)?.image.startsWith("http")
                ? `${partner(chat?.chatUsers, profile?._id)?.image}`
                : `https://make-it-happen-demo.herokuapp.com/${
                    partner(chat.chatUsers, profile?._id)?.image
                  }`
            }
            alt=""
            className="sidebar__discussion-img"
          />
          <div className="sidebar__msg">
            <p className="sidebar__name">
              {partner(chat?.chatUsers, profile._id).firstName +
                "  " +
                partner(chat?.chatUsers, profile._id).lastName}
            </p>
            <p>
              {msgSender(chat)}
              {chat?.messages[chat.messages.length - 1].text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const partner = (chatUsers, userId) => {
  return chatUsers.filter((user) => user._id !== userId)[0];
};
