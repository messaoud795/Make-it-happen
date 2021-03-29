const mongoose = require("mongoose");
const Chat = require("../models/chatModel");
const Pusher = require("pusher");
const { findById } = require("../models/chatModel");

const connectPusher = () => {
  const pusher = new Pusher({
    appId: "1177978",
    key: "22769e8d448bb4cddf2c",
    secret: "1dfeb811bdebd034abea",
    cluster: "eu",
    useTLS: true,
  });

  db = mongoose.connection;
  db.once("open", function () {
    const chatCollection = db.collection("chats");
    const changeStream = chatCollection.watch();

    changeStream.on("change", async function (change) {
      console.log(change);
      if (
        change.operationType === "update" ||
        change.operationType === "insert"
      ) {
        const chatId = change.documentKey;
        try {
          let { messages } = await Chat.findById(chatId);
          console.log(messages);
          console.log(messages[messages.length - 1]);
          pusher.trigger("chats", "updated", {
            msg: messages[messages.length - 1],
          });
        } catch (error) {
          console.log(error);
        }
      } else console.log("Error triggering pusher");
    });
  });
};

module.exports = connectPusher;
