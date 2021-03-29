const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const msgSchema = new Schema({
  // chatId: { type: String, required: true },
  text: { type: String, required: true },
  userId: { type: String, required: true },
  timeStamp: { type: String, required: true, default: new Date().getTime() },
});

module.exports = mongoose.model("msg", msgSchema);
