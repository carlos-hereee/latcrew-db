const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/lowerCase");

const heroSchema = new Schema(
  {
    // key variables
    heroId: { type: String, require: true, unique: true },
    menuItemId: { type: String },
    // hero detail data
    title: { type: String },
    data: { type: String },
    body: { type: String },
    heading: { type: String },
    // asset
    small: { type: String },
    url: { type: String },
    alt: { type: String },
    link: { type: String },
    icon: { type: String, set: toLower },
    name: { type: String },
    label: { type: String },
    theme: { type: String },
    type: { type: String },
    ping: { type: Number },
    // multer options
    filename: { type: String },
    minetype: { type: String },
    encoding: { type: String },
    size: { type: Number },
    // 3rd party asset
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
