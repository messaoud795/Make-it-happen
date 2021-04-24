const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Field = require("../models/fieldModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const jwtKey = process.env.SecretKey;
const fieldsNames = require("./fieldsNames");
const fileUpload = require("../middlewares/file-upload");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

//Register
router.post("/register", fileUpload.single("image"), async (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 12);
  //create a document
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    image: req.file.path,
  });

  try {
    await newUser.save();
    //create fields
    const defaultFields = fieldsNames.map((el) => {
      return { name: el.toUpperCase(), userId: newUser._id };
    });

    try {
      defaultFields.map((field) => {
        let newField = new Field(field);
        newField.save();
      });
    } catch (err) {
      console.log(err);
    }

    const token = await jwt.sign(
      {
        userId: newUser._id,
        userEmail: newUser.email,
      },
      jwtKey
    );
    res.send({
      userData: { firstName: newUser.firstName, image: newUser.image },
      token: token,
    });
  } catch (error) {
    if (error.keyPattern.email === 1) res.send({ msg: "email already exists" });
    else {
      if (req.file) {
        fs.unlink(req.file.path, (error) => {
          if (error) console.log(error);
        });
      }
      res.send({ msg: "Server error" });
    }
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.status(400).send({ msg: "email doesn't exist" });
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
          userData: { firstName: foundUser.firstName, image: foundUser.image },
          token: token,
        });
      } else {
        res
          .status(400)
          .send({ msg: "password doesn't match the email account" });
      }
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
  }
});

//Login with google
router.post("/google_login", async (req, res) => {
  try {
    const client = new OAuth2Client(
      "888276232633-e56suk9n75ci04dfcj7mrcolb318f1sv.apps.googleusercontent.com"
    );
    const { tokenId } = req.body;
    try {
    } catch (error) {}
    const { payload } = await client.verifyIdToken({
      idToken: tokenId,
      audience:
        "888276232633-e56suk9n75ci04dfcj7mrcolb318f1sv.apps.googleusercontent.com",
    });
    const { email_verified, family_name, given_name, picture, email } = payload;
    if (email_verified) {
      let foundUser = await User.findOne({ email });
      if (foundUser) {
        //user exist in the database
        const token = await jwt.sign(
          {
            userId: foundUser._id,
            userEmail: foundUser.email,
          },
          jwtKey
        );
        res.send({
          userData: { firstName: foundUser.firstName, image: foundUser.image },
          token: token,
        });
      }
      //create user
      else {
        let password = bcrypt.hashSync(email + jwtKey, 12);
        const newUser = new User({
          firstName: given_name,
          lastName: family_name,
          email,
          password,
          image: picture,
        });
        newUser.save();
        //create fields
        const defaultFields = fieldsNames.map((el) => {
          return { name: el.toUpperCase(), userId: newUser._id };
        });

        try {
          defaultFields.map((field) => {
            let newField = new Field(field);
            newField.save();
          });
        } catch (err) {
          console.log(err);
        }
        const token = await jwt.sign(
          {
            userId: newUser._id,
            userEmail: newUser.email,
          },
          jwtKey
        );
        res.send({
          userData: { firstName: newUser.firstName, image: newUser.image },
          token: token,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ msg: "Servor Error" });
  }
});

//facebook login
router.post("/facebook_login", async (req, res) => {
  const { userID, accessToken } = req.body;
  let urlGraphFacebook = ` https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`;
  fetch(urlGraphFacebook, { method: "Get" })
    .then((res) => res.json())
    .then(async (json) => {
      let firstName = json.name.split(" ")[0];
      let lastName = json.name.split(" ")[1];
      let email = json.email;
      let picture = json.picture.data.url;
      try {
        let foundUser = await User.findOne({ email });
        if (foundUser) {
          //user exist in the database
          const token = await jwt.sign(
            {
              userId: foundUser._id,
              userEmail: foundUser.email,
            },
            jwtKey
          );
          res.send({
            userData: {
              firstName: foundUser.firstName,
              image: foundUser.image,
            },
            token: token,
          });
        } else {
          let password = bcrypt.hashSync(email + jwtKey, 12);
          const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email,
            password,
            image: picture,
          });
          newUser.save();
          //create fields
          const defaultFields = fieldsNames.map((el) => {
            return { name: el.toUpperCase(), userId: newUser._id };
          });

          try {
            defaultFields.map((field) => {
              let newField = new Field(field);
              newField.save();
            });
          } catch (err) {
            console.log(err);
          }
          const token = await jwt.sign(
            {
              userId: newUser._id,
              userEmail: newUser.email,
            },
            jwtKey
          );
          res.send({
            userData: { firstName: newUser.firstName, image: newUser.image },
            token: token,
          });
        }
      } catch (error) {
        res.status(500).send({ msg: "servor error" });
      }
    });
});

//load a profile
router.get("/profile", auth, (req, res) => {
  User.findById(
    req.userData.userId,
    "firstName lastName image paid",
    (err, user) => {
      if (err) res.send(err);
      else res.send(user);
    }
  );
});

//delete an account
router.delete("/delete", auth, (req, res) => {
  User.findByIdAndRemove(req.userData.userId, (error) => {
    error ? res.send("account not deleted") : res.send("account deleted");
  });
});

module.exports = router;
