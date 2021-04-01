const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  chatUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "msg" }],
});

module.exports = mongoose.model("chat", chatSchema);
