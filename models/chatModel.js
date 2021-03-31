const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  chatUsers: [String],
  messages: [{ type: Schema.Types.ObjectId, ref: "msg" }],
  // messages: [Object],
});

module.exports = mongoose.model("chat", chatSchema);
