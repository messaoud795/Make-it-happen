import React from "react";
import { useSelector } from "react-redux";
// import { Icon } from "semantic-ui-react";
import "./Sidebar.css";
import { useHistory } from "react-router";

export default function Sidebar() {
  const { chats } = useSelector((state) => state.chats);
  const { profile } = useSelector((state) => state.auth);
  const history = useHistory();

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
            src={`/${partner(chat.chatUsers, profile._id)?.image}`}
            alt=""
            className="sidebar__discussion-img"
          />

          <div>
            <p>
              {partner(chat.chatUsers, profile._id).firstName +
                "  " +
                partner(chat.chatUsers, profile.id).lastName}
            </p>
            <p>{chat.messages[chat.messages.length - 1].text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const partner = (chatUsers, userId) => {
  return chatUsers.filter((user) => user._id !== userId)[0];
};
