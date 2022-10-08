const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", userSchema);
