const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Field = require("../models/fieldModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const jwtKey = process.env.SecretKey;
const fieldsNames = require("./fieldsNames");

//Register
router.post("/register", async (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 12);
  //create a document
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    //create fields
    const defaultFields = fieldsNames.map((el) => {
      return { name: el, userId: newUser._id };
    });
    Field.insertMany(defaultFields, (err, data) => {
      if (err) console.log(error);
    });

    const token = await jwt.sign(
      {
        userId: newUser._id,
        userEmail: newUser.email,
      },
      jwtKey
    );
    res.send({
      firstName: newUser.firstName,
      token: token,
    });
  } catch (error) {
    error.keyPattern.email === 1
      ? res.send({ msg: "email already exists" })
      : res.send({ msg: "Server error" });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.send("email doesn't exist");
    try {
      const match = await bcrypt.compare(req.body.password, foundUser.password);
      if (match) {
        const token = await jwt.sign(
          {
            userId: foundUser._id,
            userEmail: foundUser.email,
          },
          jwtKey
        );
        res.send({
          firstName: foundUser.firstName,
          token: token,
        });
      } else {
        res.send("password doesn't match the email account");
      }
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
  }
});

//delete an account
router.delete("/delete", auth, (req, res) => {
  User.findByIdAndRemove(req.userData.userId, (error) => {
    error ? res.send("account not deleted") : res.send("account deleted");
  });
});

module.exports = router;
