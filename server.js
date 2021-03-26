const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const path = require("path");
const Pusher = require("pusher");

//configuration
const app = express();
const Port = 5000 || process.env.Port;
app.use(cors());
const pusher = new Pusher({
  appId: "1177978",
  key: "22769e8d448bb4cddf2c",
  secret: "1dfeb811bdebd034abea",
  cluster: "eu",
  useTLS: true,
});

//database connection
connectDB();
//change stream configuration
db = mongoose.connection;
db.once("open", function () {
  const msgCollection = db.collection("msgs");
  const changeStream = msgCollection.watch();
  changeStream.on("change", function (change) {
    console.log(change);
    if (change.operationType === "insert") {
      const msgDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        texte: msgDetails.texte,
        userId: msgDetails.userId,
      });
    } else console.log("Error triggering pusher");
  });
});

//middlewares
app.use(express.json({ extended: false }));
app.use("/uploads/images", express.static(path.join("uploads", "images")));

//routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/field", require("./routes/fieldRoute"));
app.use("/api/goal", require("./routes/goalRoute"));
app.use("/api/action", require("./routes/actionRoute"));
app.use("/api/promodoro", require("./routes/promodoroRoute"));
app.use("/api/msg", require("./routes/msgRoute"));

//sever starter
app.listen(Port, () => console.log(`Server is running on port ${Port}`));

//C:\Program Files\MongoDB\Server\3.4\bin
