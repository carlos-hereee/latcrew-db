const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    sessionId: { type: String, require: true, unique: true },
    isValid: { type: Boolean, require: true },
    email: { type: String },
    username: { type: String },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
