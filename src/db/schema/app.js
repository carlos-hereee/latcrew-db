const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appSchema = new Schema(
  {
    appId: { type: String, require: true },
    languageId: { type: String },
    appName: { type: String },
    themeList: [{ type: String }],
    logoId: { type: Schema.Types.ObjectId, ref: "Hero" },
    ownerId: { type: String },
    adminIds: [{ type: String }],
    newsletter: {
      title: { type: String, default: "Join the newsletter" },
      subtitle: { type: String, default: "Suscribe to get the latest content by email" },
      details: { type: String, default: "Unsubscribe at any time." },
      heroId: { type: Schema.Types.ObjectId, ref: "Hero" },
    },
    media: {
      title: { type: String, default: "Dont miss a thing! Follow us on our socials" },
      heroId: { type: String },
      socials: [{ type: Schema.Types.ObjectId, ref: "Hero" }],
    },
    menu: [
      {
        menuId: { type: String },
        isToggle: { type: Boolean, default: false },
        isPrivate: { type: Boolean, default: false },
        // menuItemId === heroId
        active: { type: Schema.Types.ObjectId, ref: "Hero" },
        alternatives: [{ type: Schema.Types.ObjectId, ref: "Hero" }],
      },
    ],
    calendar: {
      name: { type: String },
      theme: { type: String },
      calendarId: { type: String },
      events: [{ eventId: { type: String } }],
    },
  },
  { timestamps: true }
);
const App = mongoose.model("App", appSchema);
module.exports = App;
