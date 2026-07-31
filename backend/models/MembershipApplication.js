const mongoose = require('mongoose');

const MembershipApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add your first name'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add your last name'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    trim: true,
  },
  organization: {
    type: String,
    trim: true,
    maxlength: [100, 'Organization cannot exceed 100 characters'],
  },
  position: {
    type: String,
    trim: true,
    maxlength: [100, 'Position cannot exceed 100 characters'],
  },
  membershipCategory: {
    type: String,
    required: [true, 'Please select a membership category'],
    enum: ['individual', 'organization', 'student', 'corporate', 'lifetime'],
  },
  motivation: {
    type: String,
    required: [true, 'Please add your motivation for joining'],
    maxlength: [1000, 'Motivation cannot exceed 1000 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
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

MembershipApplicationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('MembershipApplication', MembershipApplicationSchema);
