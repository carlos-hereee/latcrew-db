const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/lowerCase");

const userSchema = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    email: { type: String, set: toLower, unique: true },
    username: { type: String, require: true, unique: true },
    nickname: { type: String },
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionId: { type: String, select: false },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
