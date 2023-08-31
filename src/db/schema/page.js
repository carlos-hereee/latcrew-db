const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    pageId: { type: String, require: true, unique: true },
    heroId: { type: String, unique: true },
    title: { type: String },
    body: { type: String },
    response: { type: String },
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
