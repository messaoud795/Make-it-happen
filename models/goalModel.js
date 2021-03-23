const mongoose = require("mongoose");
const schema = mongoose.Schema;

const goalSchema = new schema({
  description: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
  fieldId: { type: String, required: true },
  parentId: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Goal", goalSchema);
