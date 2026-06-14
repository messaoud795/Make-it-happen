const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const path = require("path");
const newMsg = require("./routes/msgRoute");
const chechoutCompleted = require("./middlewares/chechoutCompleted");
var compression = require("compression");
var secure = require("ssl-express-www");
const initCronJobs = require("./cronJobs");
// const io = require("socket.io")(5000);

//configuration
const app = express();
const port = process.env.PORT || 5000;

// Configuration CORS
const corsOptions = {
  origin: "https://make-it-happen.onrender.com", // L'origine autorisée
  optionsSuccessStatus: 200, // Pour les navigateurs anciens ou certains cas spécifiques
};
app.use(cors(corsOptions));
// app.use(compression());
// app.use(secure);

//deployment

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("*", function (req, res, next) {
    const url = req.originalUrl;
    if (!url.startsWith("/api/")) {
      res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
          res.status(500).send(err);
        },
      );
      return;
    }
    next();
  });
}
//database connection
connectDB();

initCronJobs();

//handle chechkout completed
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  chechoutCompleted,
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
const expressServer = app.listen(port, () =>
  console.log(`Server is running on port ${port}`),
);
