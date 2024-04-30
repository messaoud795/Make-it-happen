const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true, lowercase: true },
  image: { type: String },
  password: { type: String, required: true },
  paid: { type: Boolean, default: false },
  actionDay: { type: Number, default: 8 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
