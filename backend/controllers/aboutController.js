const About = require('../models/About');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get published about info
// @route   GET /api/about
// @access  Public
exports.getAbout = asyncHandler(async (req, res, next) => {
  const about = await About.findOne({ isPublished: true }).sort('-createdAt');

  if (!about) {
    return res.status(404).json({
      success: false,
      error: 'About information not found',
    });
  }

  res.status(200).json({
    success: true,
    data: about,
  });
});

// @desc    Create about info
// @route   POST /api/about
// @access  Private (Admin)
exports.createAbout = asyncHandler(async (req, res, next) => {
  const about = await About.create(req.body);

  res.status(201).json({
    success: true,
    data: about,
  });
});

// @desc    Update about info
// @route   PUT /api/about/:id
// @access  Private (Admin)
exports.updateAbout = asyncHandler(async (req, res, next) => {
  let about = await About.findById(req.params.id);

  if (!about) {
    return res.status(404).json({
      success: false,
      error: 'About information not found',
    });
  }

  about = await About.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: about,
  });
});

// @desc    Delete about info
// @route   DELETE /api/about/:id
// @access  Private (Admin)
exports.deleteAbout = asyncHandler(async (req, res, next) => {
  const about = await About.findById(req.params.id);

  if (!about) {
    return res.status(404).json({
      success: false,
      error: 'About information not found',
    });
  }

  await about.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
