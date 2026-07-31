const Event = require('../models/Event');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find({ isPublished: true }).sort('date');

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
});

// @desc    Get upcoming events
// @route   GET /api/events/upcoming
// @access  Public
exports.getUpcomingEvents = asyncHandler(async (req, res, next) => {
  const now = new Date();
  const events = await Event.find({
    isPublished: true,
    date: { $gte: now },
  }).sort('date').limit(10);

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
});

// @desc    Get past events
// @route   GET /api/events/past
// @access  Public
exports.getPastEvents = asyncHandler(async (req, res, next) => {
  const now = new Date();
  const events = await Event.find({
    isPublished: true,
    date: { $lt: now },
  }).sort('-date');

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
});

// @desc    Get single event by slug
// @route   GET /api/events/:slug
// @access  Public
exports.getEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findOne({ slug: req.params.slug, isPublished: true });

  if (!event) {
    return res.status(404).json({
      success: false,
      error: 'Event not found',
    });
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin)
exports.createEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    data: event,
  });
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin)
exports.updateEvent = asyncHandler(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      error: 'Event not found',
    });
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      error: 'Event not found',
    });
  }

  await event.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
