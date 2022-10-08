const { Schema, model } = require("mongoose");

const accountSchema = new Schema({
  accountUser: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  clientId: { type: Number, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: String,
});

module.exports = model("Account", accountSchema);
