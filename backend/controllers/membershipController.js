const MembershipApplication = require('../models/MembershipApplication');
const asyncHandler = require('../middleware/asyncHandler');
const { sendMembershipNotification } = require('../utils/email');

// @desc    Create new membership application
// @route   POST /api/memberships
// @access  Public
exports.createMembershipApplication = asyncHandler(async (req, res, next) => {
  const application = await MembershipApplication.create(req.body);

  // Send notification email (non-blocking)
  sendMembershipNotification(application).catch((err) =>
    console.error('Email notification failed:', err.message)
  );

  res.status(201).json({
    success: true,
    message: 'Membership application submitted successfully. We will contact you soon.',
    data: application,
  });
});

// @desc    Get all membership applications
// @route   GET /api/memberships
// @access  Private (Admin)
exports.getMembershipApplications = asyncHandler(async (req, res, next) => {
  const applications = await MembershipApplication.find().sort('-createdAt');

  res.status(200).json({
    success: true,
    count: applications.length,
    data: applications,
  });
});

// @desc    Get single membership application
// @route   GET /api/memberships/:id
// @access  Private (Admin)
exports.getMembershipApplication = asyncHandler(async (req, res, next) => {
  const application = await MembershipApplication.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      error: 'Application not found',
    });
  }

  res.status(200).json({
    success: true,
    data: application,
  });
});

// @desc    Update membership application status
// @route   PUT /api/memberships/:id
// @access  Private (Admin)
exports.updateMembershipApplication = asyncHandler(async (req, res, next) => {
  let application = await MembershipApplication.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      error: 'Application not found',
    });
  }

  application = await MembershipApplication.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: application,
  });
});

// @desc    Delete membership application
// @route   DELETE /api/memberships/:id
// @access  Private (Admin)
exports.deleteMembershipApplication = asyncHandler(async (req, res, next) => {
  const application = await MembershipApplication.findById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      error: 'Application not found',
    });
  }

  await application.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
