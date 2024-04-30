const express = require("express");
const { verify } = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const actionModel = require("../models/actionModel");
const { findById } = require("../models/goalModel");
const router = express.Router();
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
const Action = require("../models/actionModel");

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
    "description startDate endDate userId",
    async (err, data) => {
      if (err) res.status(500).send(err);
      else {
        try {
          let similarGoals = data.filter((el) =>
            compareGoals(description, el.description)
          );
          let goals = await similarGoals.map((el) => el.userId);
          let users = await User.find(
            { _id: { $in: goals } },
            "firstName lastName image"
          );
          for (const i in similarGoals) {
            similarGoals[i] = { ...users[i]._doc, goal: similarGoals[i] };
          }

          if (similarGoals.length === 0) res.send({ msg: "No partners found" });
          res.send(similarGoals);
        } catch (error) {
          res.status(500).send({msg:"Server error"});
        }
      }
    }
  );
});

router.post("/add", auth, async (req, res) => {
  try {
    const newGoal = new Goal({
      ...req.body,
      userId: req.userData.userId,
    });
    await newGoal.save();
    res.status(200).send({ msg: "success " });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});

router.patch("/edit", auth, (req, res) => {
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

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    let { category } = await Goal.findById(req.params.id);
    deleteGoals(req.params.id, category);
    res.status(200).send({ msg: "success" });
  } catch (error) {
    res.status(500).send({ msg: "error" });
  }
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

async function deleteGoals(id, category) {
  let goalsToBeDeleted = [id];
  var finished = false;
  try {
    while (category !== "short term" && !finished) {
      let found = await Goal.find({ parentId: id });
      if (found.length > 0) {
        found.map((goal) => goalsToBeDeleted.push(goal._id.toString()));
        id = found[0]._id;
        category = found[0].category;
        found = [];
      } else finished = true;
    }

    if (category === "short term")
      await Action.findOneAndDelete({
        parentId: goalsToBeDeleted[goalsToBeDeleted.length - 1],
      });
    await Goal.deleteMany({ _id: goalsToBeDeleted });
  } catch (error) {
    console.log(error);
  }
}
