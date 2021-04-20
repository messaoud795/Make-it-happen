const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const connectPusher = require("./config/pusher");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const path = require("path");
const deployment = require("./middlewares/deployment");
const chechoutCompleted = require("./middlewares/chechoutCompleted");

//configuration
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

//deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", deployment);
}

//database connection
connectDB();
//change stream configuration
connectPusher();
//handle chechkout completed
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  chechoutCompleted
);

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
app.use("/api/payment", require("./routes/paymentRoute"));

//sever starter
app.listen(port, () => console.log(`Server is running on port ${port}`));

//C:\Program Files\MongoDB\Server\3.4\bin
