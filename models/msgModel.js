const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const msgSchema = new Schema({
  text: { type: String, required: true },
  userId: { type: String, required: true },
  timeStamp: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("msg", msgSchema);
