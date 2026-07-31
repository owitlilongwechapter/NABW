const ImpactStat = require('../models/ImpactStat');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all published impact stats
// @route   GET /api/impact-stats
// @access  Public
exports.getImpactStats = asyncHandler(async (req, res, next) => {
  const stats = await ImpactStat.find({ isPublished: true }).sort('order');

  res.status(200).json({
    success: true,
    count: stats.length,
    data: stats,
  });
});

// @desc    Get single impact stat by ID
// @route   GET /api/impact-stats/:id
// @access  Public
exports.getImpactStat = asyncHandler(async (req, res, next) => {
  const stat = await ImpactStat.findById(req.params.id);

  if (!stat || !stat.isPublished) {
    return res.status(404).json({
      success: false,
      error: 'Impact stat not found',
    });
  }

  res.status(200).json({
    success: true,
    data: stat,
  });
});

// @desc    Create new impact stat
// @route   POST /api/impact-stats
// @access  Private (Admin)
exports.createImpactStat = asyncHandler(async (req, res, next) => {
  const stat = await ImpactStat.create(req.body);

  res.status(201).json({
    success: true,
    data: stat,
  });
});

// @desc    Update impact stat
// @route   PUT /api/impact-stats/:id
// @access  Private (Admin)
exports.updateImpactStat = asyncHandler(async (req, res, next) => {
  let stat = await ImpactStat.findById(req.params.id);

  if (!stat) {
    return res.status(404).json({
      success: false,
      error: 'Impact stat not found',
    });
  }

  stat = await ImpactStat.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: stat,
  });
});

// @desc    Delete impact stat
// @route   DELETE /api/impact-stats/:id
// @access  Private (Admin)
exports.deleteImpactStat = asyncHandler(async (req, res, next) => {
  const stat = await ImpactStat.findById(req.params.id);

  if (!stat) {
    return res.status(404).json({
      success: false,
      error: 'Impact stat not found',
    });
  }

  await stat.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
