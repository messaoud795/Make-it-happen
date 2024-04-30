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
    const foundUser = await User.findById(req.userData.userId);
    let actions = await Action.find({ userId: req.userData.userId });
    let habits = await actions.filter((action) => action.type == "Daily habit");
    // await habits.forEach((habit) => (habit.startDate = new Date()));

    let todayActions = await actions.filter(
      (el) =>
        el.startDate.toLocaleDateString() == new Date().toLocaleDateString()
    );

    todayActions.push(...habits);
    //Reset actions completion state after midnight
    //compare the previous day stored in user schema with request time
    // if they are different reset actions and set variable
    const requestCurrentDay = new Date().getDay();

    if (foundUser && requestCurrentDay !== foundUser?.actionDay) {
      await User.findByIdAndUpdate(
        req.userData.userId,
        { ...foundUser._doc, actionDay: requestCurrentDay },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      todayActions.forEach((action) => (action.completed = false));
    }
    res.send(todayActions);
  } catch (error) {
    res.send({ msg: "error" });
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
    }
  );
});

router.delete("/delete/:id", auth, (req, res) => {
  Action.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send({ msg: "error" });
    else res.status(200).send({ msg: "deleted" });
  });
});

module.exports = router;
