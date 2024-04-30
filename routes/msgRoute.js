const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Msg = require("../models/msgModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

//add a new message
router.post("/add", auth, async (req, res) => {
  const socket = require("../server");
  //add the message to the database
  try {
    const newMsg = new Msg({
      text: req.body.text,
      userId: req.userData.userId,
    });
    await newMsg.save();
    //identify the chat users
    let chatUsers = [req.body.partnerId, req.userData.userId];
    let chat =
      (await Chat.findOne({
        chatUsers: chatUsers,
      })) ||
      (await Chat.findOne({
        chatUsers: [req.userData.userId, req.body.partnerId],
      }));
    //push the msg to the chat
    if (chat)
      await Chat.findByIdAndUpdate(
        chat._id,
        { $push: { messages: newMsg } },
        { upsert: true }
      );
    else await Chat.create({ chatUsers: chatUsers, messages: newMsg });
    res.status(200).send(newMsg);

    //emit the msg to all clients that are joined the same room
    socket
      // .to(chat._id.toString())
      // .to("61426a1c1916b1035c0081f2")

      .emit("sendMsg", { chatId: chat._id, msg: newMsg });
    console.log("msg event emeted");
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
    console.log(error);
  }
});

//get all msgs
router.get("/", auth, async (req, res) => {
  Chat.find({ chatUsers: { $in: [req.userData.userId] } })
    .populate("chatUsers", "firstName lastName image")
    .populate("messages")
    .exec((err, chats) => {
      if (err) res.status(500).send({ msg: "Server error" });
      else {
        res.status(200).send(chats);
      }
    });
});

module.exports = router;
