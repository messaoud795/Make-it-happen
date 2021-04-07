const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const connectPusher = require("./config/pusher");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const path = require("path");

//configuration
const app = express();
const Port = 5000 || process.env.Port;
app.use(cors());
//deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  //send the react html if url not for api or images
  // app.get("*", function (req, res, next) {
  //   let url = req.originalUrl;
  //   if (url.startsWith("/uploads")) {
  //     let file = url.slice(16);
  //     res.sendFile(path.resolve(__dirname, "uploads", "images", file));
  //     return;
  //   } else if (!url.startsWith("/api/")) {
  //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  //     return;
  //   }
  //   next();
  // });
}

//database connection
connectDB();
//change stream configuration
connectPusher();

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
