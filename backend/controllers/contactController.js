const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../middleware/asyncHandler');
const { sendContactNotification, sendContactAutoReply } = require('../utils/email');

// @desc    Submit a contact message
// @route   POST /api/contacts
// @access  Public
exports.submitContactMessage = asyncHandler(async (req, res, next) => {
  const message = await ContactMessage.create(req.body);

  // Send notification emails (non-blocking)
  sendContactNotification(message).catch((err) =>
    console.error('Admin notification failed:', err.message)
  );
  sendContactAutoReply(message).catch((err) =>
    console.error('Auto-reply failed:', err.message)
  );

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully. We will get back to you soon.',
    data: message,
  });
});

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Private (Admin)
exports.getContactMessages = asyncHandler(async (req, res, next) => {
  const messages = await ContactMessage.find().sort('-createdAt');

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages,
  });
});

// @desc    Get single contact message
// @route   GET /api/contacts/:id
// @access  Private (Admin)
exports.getContactMessage = asyncHandler(async (req, res, next) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      error: 'Message not found',
    });
  }

  res.status(200).json({
    success: true,
    data: message,
  });
});

// @desc    Update contact message status
// @route   PUT /api/contacts/:id
// @access  Private (Admin)
exports.updateContactMessage = asyncHandler(async (req, res, next) => {
  let message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      error: 'Message not found',
    });
  }

  message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: message,
  });
});

// @desc    Delete contact message
// @route   DELETE /api/contacts/:id
// @access  Private (Admin)
exports.deleteContactMessage = asyncHandler(async (req, res, next) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      error: 'Message not found',
    });
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
