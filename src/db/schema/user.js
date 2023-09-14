const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/lowerCase");

const userSchema = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, set: toLower },
    nickname: { type: String },
    heroId: { type: String },
    languageId: { type: String, default: "english-en" },
    permissions: [{ appId: { type: String }, role: { type: String } }],
    auth: {
      salt: { type: String, select: false },
      sessionId: { type: String, select: false },
      password: { type: String, required: true, select: false },
      passwordHistory: [{ type: String, select: false }],
    },
    ownedApps: [{ appId: { type: String } }],
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
module.exports = { Users, userSchema };
