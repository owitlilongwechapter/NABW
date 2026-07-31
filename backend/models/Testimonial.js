const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  organization: {
    type: String,
    trim: true,
    maxlength: [100, 'Organization cannot exceed 100 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please add testimonial content'],
    maxlength: [1000, 'Content cannot exceed 1000 characters'],
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  isPublished: {
    type: Boolean,
    default: true,
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

TestimonialSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
