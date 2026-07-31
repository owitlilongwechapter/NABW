const mongoose = require('mongoose');

const StrategicPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  longTermGoals: [{
    title: String,
    description: String,
  }],
  strategicPillars: [{
    title: String,
    description: String,
    icon: String,
  }],
  implementationFramework: {
    type: String,
  },
  timeline: {
    startYear: Number,
    endYear: Number,
  },
  documents: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['pdf', 'doc', 'xls', 'link'],
    },
  }],
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

StrategicPlanSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('StrategicPlan', StrategicPlanSchema);
