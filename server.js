const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");

//configuration
const app = express();
const Port = 5000 || process.env.Port;
app.use(cors());
//database connection
connectDB();

//middlewares
app.use(express.json({ extended: false }));

//routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/field", require("./routes/fieldRoute"));
app.use("/api/goal", require("./routes/goalRoute"));
app.use("/api/action", require("./routes/actionRoute"));

//sever starter
app.listen(Port, () => console.log(`Server is running on port ${Port}`));

//C:\Program Files\MongoDB\Server\3.4\bin
