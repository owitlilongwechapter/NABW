const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: [true, 'Please add organization name'],
    trim: true,
  },
  mission: {
    type: String,
    required: [true, 'Please add mission statement'],
  },
  vision: {
    type: String,
    required: [true, 'Please add vision statement'],
  },
  objectives: [String],
  history: {
    type: String,
  },
  coreValues: [{
    title: String,
    description: String,
    icon: String,
  }],
  leadership: [{
    name: String,
    position: String,
    bio: String,
    image: String,
  }],
  governance: {
    type: String,
  },
  strategicPriorities: [String],
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

AboutSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('About', AboutSchema);
