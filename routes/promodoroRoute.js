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

router.post("/update", auth, async (req, res) => {
  const pomodoro = await Promodoro.findOne({
    userId: req.userData.userId,
  });
  let record = pomodoro?.distractions;
  if (req.body.result < record || !record) record = req.body.result;
  Promodoro.findOneAndUpdate(
    { userId: req.userData.userId },
    { distractions: record },
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
