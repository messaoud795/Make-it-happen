const mongoose = require("mongoose");
const Chat = require("../models/chatModel");
const Pusher = require("pusher");

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

    changeStream.on("change", function (change) {
      if (
        change.operationType === "update" ||
        change.operationType === "insert"
      ) {
        const chatId = change.documentKey;
        Chat.findById(chatId)
          .populate("messages")
          .exec((err, data) => {
            pusher.trigger("chats", "updated", {
              chatId: chatId,
              msg: data.messages[data.messages.length - 1],
            });
          });
      } else console.log("Error triggering pusher");
    });
  });
};

module.exports = connectPusher;
