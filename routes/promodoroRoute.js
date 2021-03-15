const express = require("express");
const router = express.Router();
const Promodoro = require("../models/promodoroModel");
const auth = require("../middlewares/auth");

router.post("/add", auth, async (req, res) => {
  try {
    const newResult = new Promodoro({
      userId: req.userData.userId,
    });
    newResult.distractions.push({ result: req.body.result });
    newResult.save();
    res.send({ msg: "success" });
  } catch (error) {
    res.send(error);
  }
});

router.patch("/update", auth, async (req, res) => {
  Promodoro.updateOne(
    { userId: req.userData.userId },
    { $push: { distractions: { result: req.body.result } } },
    { upsert: true },
    (err, data) => {
      if (err) console.log(err);
      else res.send({ msg: "success" });
    }
  );
});

router.get("/", auth, async (req, res) => {
  Promodoro.findOne(
    { userId: req.userData.userId },
    "distractions",
    (err, data) => {
      if (err) res.status(500).send(err);
      else {
        res.send(data);
      }
    }
  );
});
module.exports = router;
