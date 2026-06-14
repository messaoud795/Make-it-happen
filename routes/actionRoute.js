const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Action = require("../models/actionModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const User = require("../models/userModel");

router.get("/:fieldId", auth, (req, res) => {
  Action.find({ fieldId: req.params.fieldId }, (err, data) => {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
});

router.get("/all/today", auth, async (req, res) => {
  try {
    // 1. Define the absolute start and end of "today" in UTC
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // 2. Query MongoDB using an OR condition
    const todayActions = await Action.find({
      userId: req.userData.userId,
      $or: [
        { type: "Daily habit" }, // Condition A: It's a daily habit
        {
          startDate: {
            // Condition B: The startDate falls within today
            $gte: startOfToday,
            $lte: endOfToday,
          },
        },
      ],
    });

    res.status(200).send(todayActions);
  } catch (error) {
    console.error("Error fetching today's actions:", error);
    res.status(500).send({ msg: "error" });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const newAction = new Action({
      description: req.body.description,
      priority: req.body.priority,
      type: req.body.type,
      startDate: req.body.startDate,
      fieldId: req.body.fieldId,
      parentId: req.body.parentId,
      userId: req.userData.userId,
    });

    await newAction.save();
    res.status(200).send({ msg: "success " });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});

router.patch("/edit", auth, (req, res) => {
  Action.findByIdAndUpdate(
    req.body.id,
    { ...req.body },
    { new: true, runValidators: true },
    (err, data) => {
      if (err) res.status(500).send({ msg: "Server error" });
      else {
        res.status(200).send({ msg: "success " });
      }
    },
  );
});

router.delete("/delete/:id", auth, (req, res) => {
  Action.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send({ msg: "error" });
    else res.status(200).send({ msg: "deleted" });
  });
});

module.exports = router;
