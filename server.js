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
// const io = require("socket.io")(5000);

//configuration
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// app.use(compression());
// app.use(secure);

//deployment
app.use(express.static(path.join(__dirname, "./client/build")));
if (process.env.NODE_ENV === "production") {
  app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "./client/build/index.html"),
      function (err) {
        res.status(500).send(err);
      }
    );
  });
}
//database connection
connectDB();

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
const expressServer = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);

// creation of socket.io server
// let io = socketio(expressServer, {
//   cors: {
//     // origin: "https://make-it-happen-demo.herokuapp.com",
//     origin: "http://localhost:5000/",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // join a discussion and send msgs to all users in it
// io.sockets.on("connection", (socket) => {
//   socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
//   socket.on("dataToServer", (dataFromClient) => {
//     console.log(dataFromClient);
//     module.exports = socket;
//   });

// socket.on("join-room", (chatId) => {
//   socket.join(chatId);
//   console.log("chat room joined", chatId);
//   module.exports = socket;
//   // socket.to(chatId).emit("sendMsg", { chatId: chatId, msg: "hi" });
// });
// });

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('client/build'))
// 	app.get('*', (req, res, next) => {
// 		let url = req.originalUrl
// 		res.setHeader('Accept-Encoding', 'gzip, compress, br')
// 		// res.setHeader("Cache-Control", "public, max-age=86400");
// 		if (url.startsWith('/uploads')) {
// 			let file = url.slice(16)
// 			res.sendFile(path.resolve(__dirname, 'uploads', 'images', file))
// 			return
// 		} else if (!url.startsWith('/api/')) {
// 			res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// 			return
// 		}
// 		next()
// 	})
// }
