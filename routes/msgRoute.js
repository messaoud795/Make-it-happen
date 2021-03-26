const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Msg = require("../models/msgModel");

router.post("/add", auth, async (req, res) => {
  try {
    const newMsg = new Msg(req.body);
    await newMsg.save();
    res.status(200).send(newMsg);
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let msgs = await Msg.find({});
    res.status(200).send(msgs);
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});

module.exports = router;
