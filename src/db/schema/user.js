const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/lowerCase");
const { appId } = require("../../../config.env");

const userSchema = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    appId: { type: String, default: appId },
    email: { type: String, set: toLower, unique: true },
    username: { type: String, require: true, unique: true },
    nickname: { type: String },
    role: { type: String, default: "client" },
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionId: { type: String, select: false },
    heroId: { type: String },
    language: {
      name: { type: String, default: "english" },
      label: { type: String, default: "English" },
      locale: { type: String, default: "en" },
      heroId: { type: String },
      languageId: { type: String, default: "english-en" },
    },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
