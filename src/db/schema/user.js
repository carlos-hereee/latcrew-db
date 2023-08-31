const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/lowerCase");

const userSchema = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    email: { type: String, set: toLower, unique: true },
    username: { type: String, require: true, unique: true },
    nickname: { type: String },
    role: { type: String },
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionId: { type: String, select: false },
    language: {
      name: { type: String, default: "english" },
      label: { type: String, default: "English" },
      locale: { type: String, default: "en" },
      assetUrl: { type: String },
      languageId: { type: String, require: true },
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
