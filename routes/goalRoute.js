const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Goal = require("../models/goalModel");

router.get("/:fieldId", auth, (req, res) => {
  Goal.find({ fieldId: req.params.fieldId }, (err, data) => {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
});

router.post("/add", auth, async (req, res) => {
  try {
    const newGoal = new Goal({
      description: req.body.description,
      category: req.body.category,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      fieldId: req.body.fieldId,
      parentId: req.body.parentId,
    });
    await newGoal.save();
    res.status(200).send({ msg: "success " });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});

// router.patch("/edit", auth, (req, res) => {
//   Field.findByIdAndUpdate(
//     req.body.id,
//     { name: req.body.name },
//     { new: true, runValidators: true },
//     (err, data) => {
//       if (err) {
//         err.keyPattern.name === 1
//           ? res.send({ msg: "name already exists" })
//           : res.status(500).send({ msg: "Server error" });
//       } else res.status(200).send({ msg: "success " });
//     }
//   );
// });

// router.delete("/delete/:id", auth, (req, res) => {
//   Field.findByIdAndDelete(req.params.id, (err) => {
//     if (err) res.send({ msg: "error" });
//     else res.send({ msg: "deleted" });
//   });
// });

module.exports = router;
