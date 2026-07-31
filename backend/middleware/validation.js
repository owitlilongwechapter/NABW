const { body, param } = require('express-validator');

// @desc    Validation middleware for Project
exports.validateProject = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('slug').notEmpty().withMessage('Slug is required'),
  body('shortDescription')
    .notEmpty()
    .withMessage('Short description is required')
    .isLength({ max: 300 })
    .withMessage('Short description cannot exceed 300 characters'),
  body('fullDescription').notEmpty().withMessage('Full description is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('startDate').notEmpty().withMessage('Start date is required'),
  body('status')
    .optional()
    .isIn(['planning', 'ongoing', 'completed', 'on-hold'])
    .withMessage('Invalid status value'),
];

// @desc    Validation middleware for Event
exports.validateEvent = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('slug').notEmpty().withMessage('Slug is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('venue').notEmpty().withMessage('Venue is required'),
];

// @desc    Validation middleware for Membership Application
exports.validateMembership = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please add a valid email'),
  body('membershipCategory')
    .notEmpty()
    .withMessage('Membership category is required')
    .isIn(['individual', 'organization', 'student', 'corporate', 'lifetime'])
    .withMessage('Invalid membership category'),
  body('motivation')
    .notEmpty()
    .withMessage('Motivation is required')
    .isLength({ max: 1000 })
    .withMessage('Motivation cannot exceed 1000 characters'),
];

// @desc    Validation middleware for Contact Message
exports.validateContact = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please add a valid email'),
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters'),
];

// @desc    Validation middleware for FAQ
exports.validateFAQ = [
  body('question')
    .notEmpty()
    .withMessage('Question is required')
    .isLength({ max: 200 })
    .withMessage('Question cannot exceed 200 characters'),
  body('answer').notEmpty().withMessage('Answer is required'),
];

// @desc    Validation middleware for Testimonial
exports.validateTestimonial = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ max: 1000 })
    .withMessage('Content cannot exceed 1000 characters'),
];

// @desc    Validation middleware for Partner
exports.validatePartner = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
];

// @desc    Validation middleware for Impact Stat
exports.validateImpactStat = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('value').notEmpty().withMessage('Value is required'),
];

// @desc    Validation middleware for News
exports.validateNews = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  body('slug').notEmpty().withMessage('Slug is required'),
  body('content').notEmpty().withMessage('Content is required'),
];

// @desc    Validation middleware for Strategic Plan
exports.validateStrategicPlan = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  body('description').notEmpty().withMessage('Description is required'),
];

// @desc    Validation middleware for About
exports.validateAbout = [
  body('organizationName')
    .notEmpty()
    .withMessage('Organization name is required'),
  body('mission').notEmpty().withMessage('Mission statement is required'),
  body('vision').notEmpty().withMessage('Vision statement is required'),
];

// @desc    Validation result handler
exports.handleValidationErrors = (req, res, next) => {
  const { validationResult } = require('express-validator');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};
