const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { appId } = require("../../../config.env");

const appSchema = new Schema(
  {
    appId: { type: String, default: appId, require: true, unique: true },
    languageId: { type: String, default: "english-en" },
    locale: { type: String, default: "en" },
    name: { type: String, default: "Sparkle and Shine" },
    theme: { type: String, default: "default" },
    isLoading: { type: Boolean, default: true },
    logo: {
      // theme: { type: String, default: "logo" },
      // name: { type: String, default: "sparkle-shine" },
      // label: { type: String, default: "Sharkle and Shine" },
      // url: { type: String, default: "icons/logo.svg" },
      // small: { type: String, default: "small/icons/logo.jpg" },
      heroId: { type: String, default: "sparke-shine-logo" },
      // alt: { type: String, default: "industry brand" },
    },
    newsletter: {
      title: { type: String, default: "Join the newsletter" },
      subtitle: { type: String, default: "Suscribe to get the latest content by email" },
      details: { type: String, default: "Unsubscribe at any time." },
      heroId: { type: String },
    },
    media: {
      title: { type: String, default: "Dont miss a thing! Follow us on our socials" },
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
        menuItemId: { type: String, require: true },
        isToggle: { type: Boolean, default: false },
        isPrivate: { type: Boolean, default: false },
        active: {
          label: { type: String },
          link: { type: String },
          icon: { type: String },
          name: { type: String },
          ping: { type: Number },
          lang: { type: String },
        },
        alternatives: [
          {
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
