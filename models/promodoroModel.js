const mongoose = require("mongoose");
const promodoroSchema = new mongoose.Schema({
  distractions: [{ result: Number, date: { type: Date, default: new Date() } }],
  userId: String,
});

module.exports = mongoose.model("Promodoro", promodoroSchema);
