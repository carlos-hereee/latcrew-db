const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventId: { type: String, require: true, unique: true },
    calendarId: { type: String, require: true, default: "sparkle-shine" },
    heroId: { type: String },
    list: [
      {
        eventId: { type: String, require: true },
        date: { type: String, require: true },
        start: { type: String, require: true },
        end: { type: String, require: true },
        isOpen: { type: Boolean },
        attendees: [
          {
            userId: { type: String },
            username: { type: String },
            email: { type: String },
            phone: { type: Number },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
const Events = mongoose.model("Events", eventSchema);
module.exports = Events;
