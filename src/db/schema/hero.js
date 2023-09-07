const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const heroSchema = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    heroId: { type: String, require: true, unique: true },
    url: { type: String, require: true },
    small: { type: String },
    alt: { type: String },
    name: { type: String },
    theme: { type: String },
    filename: { type: String },
    minetype: { type: String },
    encoding: { type: String },
    size: { type: Number },
    credit: {
      artistName: { type: String },
      artistUrl: { type: String },
      assetUrl: { type: String },
    },
  },
  { timestamps: true }
);
const Hero = mongoose.model("Hero", heroSchema);
module.exports = Hero;
