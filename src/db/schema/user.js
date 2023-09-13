const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/lowerCase");

const userSchema = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, set: toLower },
    role: { type: String },
    auth: {
      salt: { type: String, select: false },
      sessionId: { type: String, select: false },
      password: { type: String, required: true, select: false },
      passwordHistory: [{ type: String, select: false }],
    },
    appId: { type: String },
    nickname: { type: String },
    heroId: { type: String },
    languageId: { type: String, default: "english-en" },
    // language: {
    //   name: { type: String, default: "english" },
    //   label: { type: String, default: "English" },
    //   locale: { type: String, default: "en" },
    //   heroId: { type: String },
    //   languageId: { type: String, default: "english-en" },
    // },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
module.exports = { Users, userSchema };
