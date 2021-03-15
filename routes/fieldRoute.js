const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Field = require("../models/fieldModel");

router.get("/", auth, (req, res) => {
  Field.find({ userId: req.userData.userId }, (err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});

router.post("/add", auth, async (req, res) => {
  var field = {
    userId: req.userData.userId,
    name: req.body.name,
  };
  let search = await Field.find(field);
  if (search) res.send({ msg: "name already exists" });
  else
    try {
      const newField = new Field(field);
      await newField.save();
      res.status(200).send({ msg: "success" });
    } catch (error) {
      res.status(500).send({ msg: "Server error" });
    }
});

router.patch("/edit", auth, (req, res) => {
  Field.findByIdAndUpdate(
    req.body.id,
    { name: req.body.name },
    { new: true, runValidators: true },
    (err, data) => {
      if (err) {
        err.keyPattern.name === 1
          ? res.send({ msg: "name already exists" })
          : res.status(500).send({ msg: "Server error" });
      } else res.status(200).send({ msg: "success " });
    }
  );
});

router.delete("/delete/:id", auth, (req, res) => {
  Field.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.send({ msg: "error" });
    else res.send({ msg: "deleted" });
  });
});

module.exports = router;
