const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Action = require("../models/actionModel");

router.get("/:fieldId", auth, (req, res) => {
  Action.find({ fieldId: req.params.fieldId }, (err, data) => {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
});

router.get("/all/today", auth, async (req, res) => {
  try {
    let actions = await Action.find({});
    let todayActions = await actions.filter(
      (el) =>
        el.startDate.toLocaleDateString() == new Date().toLocaleDateString()
    );

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
      endDate: req.body.endDate,
      fieldId: req.body.fieldId,
      parentId: req.body.parentId,
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
        console.log(data);
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
