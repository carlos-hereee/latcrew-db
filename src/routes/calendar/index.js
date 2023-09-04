const router = require("express").Router();
const requireUser = require("../../middleware/auth/requireUser");
const getCalendarId = require("../../middleware/calendar/getCalendarId");
const addEvent = require("./addEvent");
const fetchCalendar = require("./fetchCalendar");

const authenticateCalendar = [requireUser, getCalendarId];

router.get("/", authenticateCalendar, fetchCalendar);
router.post("/add-event", authenticateCalendar, addEvent);

module.exports = router;
