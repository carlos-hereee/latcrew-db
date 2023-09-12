const mongoose = require("mongoose");
const { appId } = require("../../../config.env");
const Schema = mongoose.Schema;

const pageSchema = new Schema(
  {
    pageId: { type: String, require: true, unique: true },
    userId: { type: String, require: true },
    appId: { type: String, default: appId },
    languageId: { type: String, require: true },
    heroId: { type: String },
    title: { type: String },
    body: { type: String },
    details: { type: String },
    name: { type: String },
    theme: { type: String },
    sections: [{ componentId: { type: String, unique: true } }],
    cta: [
      {
        uid: { type: String, unique: true },
        icon: { type: String },
        label: { type: String },
        name: { type: String },
        title: { type: String },
        theme: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const Page = mongoose.model("Page", pageSchema);
module.exports = Page;
