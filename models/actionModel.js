const mongoose = require("mongoose");
const actionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  priority: { type: String, required: true },
  type: { type: String },
  completed: { type: Boolean, default: false },
  startDate: { type: Date, required: true },
  fieldId: { type: String, required: true },
  parentId: { type: String, required: true },
  userId: String,
});

module.exports = mongoose.model("Action", actionSchema);
