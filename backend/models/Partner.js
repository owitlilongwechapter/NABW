const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a partner name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  logo: {
    type: String,
  },
  website: {
    type: String,
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  type: {
    type: String,
    enum: ['partner', 'sponsor', 'collaborator'],
    default: 'partner',
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

PartnerSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Partner', PartnerSchema);
