const express = require("express");
const { verify } = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const router = express.Router();
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

router.get("/:fieldId", auth, (req, res) => {
  Goal.find({ fieldId: req.params.fieldId }, (err, data) => {
    if (err) res.status(500).send(err);
    else {
      res.send(data);
    }
  });
});

router.get("/partners/:fieldId", auth, async (req, res) => {
  let { description } = await Goal.findById(req.params.fieldId, "description");
  Goal.find(
    { userId: { $ne: req.userData.userId }, status: "public" },
    async (err, data) => {
      if (err) res.status(500).send(err);
      else {
        let similarGoals = data.filter((el) =>
          compareGoals(description, el.description)
        );
        let goals = await similarGoals.map((el) => el.userId);
        let users = await User.find({ _id: { $in: goals } });
        for (const i in similarGoals) {
          similarGoals[i] = { goal: similarGoals[i], user: users[i] };
        }

        if (similarGoals.length === 0) res.send({ msg: "No partners found" });
        res.send(similarGoals);
      }
    }
  );
});

router.post("/add", auth, async (req, res) => {
  try {
    const newGoal = new Goal({
      description: req.body.description,
      category: req.body.category,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: req.body.status,
      fieldId: req.body.fieldId,
      parentId: req.body.parentId,
      userId: req.userData.userId,
    });
    await newGoal.save();
    res.status(200).send({ msg: "success " });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});

router.patch("/edit", auth, (req, res) => {
  console.log(req.body);
  Goal.findByIdAndUpdate(
    req.body.id,
    { ...req.body },
    { new: true, runValidators: true },
    (err, data) => {
      if (err) res.status(500).send({ msg: "Server error" });
      else res.status(200).send({ msg: "success " });
    }
  );
});

router.delete("/delete/:id", auth, (req, res) => {
  Goal.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send({ msg: "error" });
    else res.status(200).send({ msg: "deleted" });
  });
});

module.exports = router;

const compareGoals = (G1, G2) => {
  const goal1 = G1.split(" ");
  const goal2 = G2.split(" ");
  const length = Math.min(goal1.length, goal2.length);
  var c = 0;
  var test = false;

  for (let i = 0; i < length; i++) {
    if (goal1[i].includes(goal2[i])) c++;
    if (c > 1) {
      test = true;
      break;
    }
  }
  return test;
};
