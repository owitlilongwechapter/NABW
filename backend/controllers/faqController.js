const FAQ = require('../models/FAQ');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all published FAQs
// @route   GET /api/faqs
// @access  Public
exports.getFAQs = asyncHandler(async (req, res, next) => {
  const faqs = await FAQ.find({ isPublished: true }).sort('order');

  res.status(200).json({
    success: true,
    count: faqs.length,
    data: faqs,
  });
});

// @desc    Get single FAQ by ID
// @route   GET /api/faqs/:id
// @access  Public
exports.getFAQ = asyncHandler(async (req, res, next) => {
  const faq = await FAQ.findById(req.params.id);

  if (!faq || !faq.isPublished) {
    return res.status(404).json({
      success: false,
      error: 'FAQ not found',
    });
  }

  res.status(200).json({
    success: true,
    data: faq,
  });
});

// @desc    Create new FAQ
// @route   POST /api/faqs
// @access  Private (Admin)
exports.createFAQ = asyncHandler(async (req, res, next) => {
  const faq = await FAQ.create(req.body);

  res.status(201).json({
    success: true,
    data: faq,
  });
});

// @desc    Update FAQ
// @route   PUT /api/faqs/:id
// @access  Private (Admin)
exports.updateFAQ = asyncHandler(async (req, res, next) => {
  let faq = await FAQ.findById(req.params.id);

  if (!faq) {
    return res.status(404).json({
      success: false,
      error: 'FAQ not found',
    });
  }

  faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: faq,
  });
});

// @desc    Delete FAQ
// @route   DELETE /api/faqs/:id
// @access  Private (Admin)
exports.deleteFAQ = asyncHandler(async (req, res, next) => {
  const faq = await FAQ.findById(req.params.id);

  if (!faq) {
    return res.status(404).json({
      success: false,
      error: 'FAQ not found',
    });
  }

  await faq.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
