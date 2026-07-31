const Testimonial = require('../models/Testimonial');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all published testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = asyncHandler(async (req, res, next) => {
  const testimonials = await Testimonial.find({ isPublished: true }).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials,
  });
});

// @desc    Get single testimonial by ID
// @route   GET /api/testimonials/:id
// @access  Public
exports.getTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial || !testimonial.isPublished) {
    return res.status(404).json({
      success: false,
      error: 'Testimonial not found',
    });
  }

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private (Admin)
exports.createTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.create(req.body);

  res.status(201).json({
    success: true,
    data: testimonial,
  });
});

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin)
exports.updateTestimonial = asyncHandler(async (req, res, next) => {
  let testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      error: 'Testimonial not found',
    });
  }

  testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
exports.deleteTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      error: 'Testimonial not found',
    });
  }

  await testimonial.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
