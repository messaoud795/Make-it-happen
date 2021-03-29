const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Msg = require("../models/msgModel");
const Chat = require("../models/chatModel");

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
  try {
    Chat.find({ chatUsers: { $in: req.userData.userId } }, (err, data) => {
      console.log(data);
      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});

module.exports = router;
