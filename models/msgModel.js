const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const msgSchema = new Schema({
  discussionId: { type: String, required: true },
  texte: { type: String, required: true },
  userId: { type: String, required: true },
  timeStamp: { type: String, required: true },
  receiverId: { type: String, required: true },
});

module.exports = mongoose.model("Msg", msgSchema);
