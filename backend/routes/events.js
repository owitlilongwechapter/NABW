const express = require('express');
const router = express.Router();
const {
  getEvents,
  getUpcomingEvents,
  getPastEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { validateEvent } = require('../middleware/validation');

router.route('/')
  .get(getEvents)
  .post(validateEvent, createEvent);

router.route('/upcoming').get(getUpcomingEvents);
router.route('/past').get(getPastEvents);

router.route('/:slug')
  .get(getEvent);

router.route('/:id')
  .put(validateEvent, updateEvent)
  .delete(deleteEvent);

module.exports = router;
