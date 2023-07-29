const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/lowerCase");

const userSchema = new Schema(
  {
    uid: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    password: { type: String, reuiqre: true },
    email: { type: String, set: toLower, unique: true },
    nickname: { type: String },
    heroUrl: { type: String },
    isOnline: { type: Boolean },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
