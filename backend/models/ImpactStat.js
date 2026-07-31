const mongoose = require('mongoose');

const ImpactStatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  value: {
    type: String,
    required: [true, 'Please add a value'],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [300, 'Description cannot exceed 300 characters'],
  },
  icon: {
    type: String,
  },
  category: {
    type: String,
    trim: true,
    default: 'General',
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

ImpactStatSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ImpactStat', ImpactStatSchema);
