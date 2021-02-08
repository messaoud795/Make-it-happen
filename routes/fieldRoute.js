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

module.exports = router;
