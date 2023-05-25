const mongoose = require("mongoose");

const promodoroSchema = new mongoose.Schema({
  distractions: { type: Number, default: 30 },
  userId: String,
});

module.exports = mongoose.model("Promodoro", promodoroSchema);
