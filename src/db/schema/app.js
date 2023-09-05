const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { appId } = require("../../../config.env");

const appSchema = new Schema(
  {
    appId: { type: String, default: appId, require: true },
    languageId: { type: String, default: "english-en" },
    locale: { type: String, default: "en" },
    name: { type: String, default: "Sparkle and Shine" },
    theme: { type: String, default: "light" },
    logo: {
      heroId: { type: String, default: "sparke-shine-logo" },
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
        menuItemId: { type: String },
        isToggle: { type: Boolean, default: false },
        isPrivate: { type: Boolean, default: false },
        active: {
          uid: { type: String },
          label: { type: String },
          link: { type: String },
          icon: { type: String },
          name: { type: String },
          ping: { type: Number },
          lang: { type: String },
        },
        alternatives: [
          {
            uid: { type: String },
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
