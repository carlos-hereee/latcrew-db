const getCalendar = require("../../db/models/calendar/getCalendar");
const msg = require("../../data/error.message.json");

module.exports = async (req, res, next) => {
  const { appId } = req.user;
  req.calendar = await getCalendar({ appId });
  if (req.calendar.length) next();
  else {
    const message = msg.calendarNotFound;
    res.status(400).json(message).end();
  }
};
