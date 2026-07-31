const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an event title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please add a slug'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'Short description cannot exceed 300 characters'],
  },
  date: {
    type: Date,
    required: [true, 'Please add an event date'],
  },
  endDate: {
    type: Date,
  },
  time: {
    type: String,
  },
  venue: {
    type: String,
    required: [true, 'Please add a venue'],
  },
  address: {
    type: String,
  },
  featuredImage: {
    type: String,
  },
  gallery: [String],
  registrationLink: {
    type: String,
  },
  registrationOpen: {
    type: Boolean,
    default: true,
  },
  capacity: {
    type: Number,
  },
  isPast: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  summary: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

EventSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', EventSchema);
