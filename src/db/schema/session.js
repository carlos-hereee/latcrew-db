const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    uid: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    isValid: { type: Boolean, require: true },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
