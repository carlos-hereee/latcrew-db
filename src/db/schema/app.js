const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { appId } = require("../../../config.env");

const appSchema = new Schema(
  {
    appId: { type: String, default: appId, require: true },
    languageId: { type: String },
    appName: { type: String },
    themeList: [{ type: String }],
    logoId: { type: String },
    newsletter: {
      title: { type: String, default: "Join the newsletter" },
      subtitle: { type: String, default: "Suscribe to get the latest content by email" },
      details: { type: String, default: "Unsubscribe at any time." },
      heroId: { type: String },
    },
    media: {
      title: { type: String, default: "Dont miss a thing! Follow us on our socials" },
      heroId: { type: String },
      socials: [{ mediaId: { type: String } }],
    },
    menu: [
      {
        menuId: { type: String },
        isToggle: { type: Boolean, default: false },
        isPrivate: { type: Boolean, default: false },
        // menuItemId === heroId
        active: { menuItemId: { type: String } },
        alternatives: [{ menuItemId: { type: String } }],
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
