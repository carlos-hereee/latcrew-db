const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { appId } = require("../../../config.env");

const appSchema = new Schema(
  {
    appId: { type: String, default: appId, require: true },
    languageId: { type: String, default: "english-en" },
    locale: { type: String, default: "en" },
    appName: { type: String, default: "Sparkle and Shine" },
    theme: { type: String, default: "light" },
    logo: {
      url: { type: String, require: true },
      name: { type: String },
      logoId: { type: String },
      filename: { type: String },
      minetype: { type: String },
      theme: { type: String },
      label: { type: String },
      encoding: { type: String },
      size: { type: Number },
    },
    newsletter: {
      title: { type: String, default: "Join the newsletter" },
      subtitle: { type: String, default: "Suscribe to get the latest content by email" },
      details: { type: String, default: "Unsubscribe at any time." },
      heroId: { type: String },
    },
    media: {
      title: { type: String, default: "Dont miss a thing! Follow us on our socials" },
      heroId: { type: String },
      socials: [
        {
          isEmpty: { type: Boolean },
          name: { type: String },
          link: { type: String },
          mediaId: { type: String },
        },
      ],
    },
    menu: [
      {
        menuId: { type: String },
        isToggle: { type: Boolean, default: false },
        isPrivate: { type: Boolean, default: false },
        active: {
          menuItemId: { type: String },
          label: { type: String },
          link: { type: String },
          icon: { type: String },
          name: { type: String },
          ping: { type: Number },
          lang: { type: String },
        },
        alternatives: [
          {
            menuItemId: { type: String },
            label: { type: String },
            link: { type: String },
            icon: { type: String },
            name: { type: String },
            ping: { type: Number },
            lang: { type: String },
          },
        ],
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
