const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Msg = require("../models/msgModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

router.post("/add", auth, async (req, res) => {
  try {
    const newMsg = new Msg({
      text: req.body.text,
      userId: req.userData.userId,
    });
    await newMsg.save();
    let chatUsers = [req.body.partnerId, req.userData.userId];
    let chat = await Chat.findOne({
      chatUsers: chatUsers,
    });
    if (chat)
      await Chat.findByIdAndUpdate(
        chat._id,
        { $push: { messages: newMsg } },
        { upsert: true }
      );
    else await Chat.create({ chatUsers: chatUsers, messages: newMsg });

    res.status(200).send(newMsg);
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});

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
