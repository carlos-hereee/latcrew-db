const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/lowerCase");

const userSchema = new Schema(
  {
    uid: { type: String, require: true, unique: true },
    email: { type: String, set: toLower, unique: true },
    username: { type: String, require: true },
    nickname: { type: String },
    heroUrl: { type: String },
    isOnline: { type: Boolean },
    authentication: {
      password: { type: String, required: true, select: false },
      hashedPassword: { type: String, require: true },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
