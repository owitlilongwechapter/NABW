const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please add a slug'],
    unique: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: [true, 'Please add a short description'],
    maxlength: [300, 'Short description cannot exceed 300 characters'],
  },
  fullDescription: {
    type: String,
    required: [true, 'Please add a full description'],
  },
  objectives: [String],
  activities: [String],
  beneficiaries: [String],
  expectedResults: [String],
  achievedResults: [String],
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date'],
  },
  endDate: {
    type: Date,
  },
  duration: {
    type: String,
  },
  status: {
    type: String,
    enum: ['planning', 'ongoing', 'completed', 'on-hold'],
    default: 'planning',
  },
  featuredImage: {
    type: String,
  },
  gallery: [String],
  partners: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Partner',
  }],
  relatedProjects: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
  }],
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['pdf', 'doc', 'xls', 'link'],
    },
  }],
  isFeatured: {
    type: Boolean,
    default: false,
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

ProjectSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
