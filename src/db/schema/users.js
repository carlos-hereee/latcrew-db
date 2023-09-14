const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/lowerCase");

const userSchema = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, set: toLower },
    nickname: { type: String },
    languageId: { type: String },
    heroId: { type: Schema.Types.ObjectId, ref: "Hero" },
    permissions: [{ appId: { type: String }, role: { type: String } }],
    auth: {
      salt: { type: String, select: false },
      sessionId: { type: String, select: false },
      password: { type: String, required: true, select: false },
      passwordHistory: [{ type: String, select: false }],
    },
    ownedApps: [{ type: String }],
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
module.exports = { Users, userSchema };
