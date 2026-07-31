const StrategicPlan = require('../models/StrategicPlan');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get published strategic plan
// @route   GET /api/strategic-plan
// @access  Public
exports.getStrategicPlan = asyncHandler(async (req, res, next) => {
  const plan = await StrategicPlan.findOne({ isPublished: true }).sort('-createdAt');

  if (!plan) {
    return res.status(404).json({
      success: false,
      error: 'Strategic plan not found',
    });
  }

  res.status(200).json({
    success: true,
    data: plan,
  });
});

// @desc    Create strategic plan
// @route   POST /api/strategic-plan
// @access  Private (Admin)
exports.createStrategicPlan = asyncHandler(async (req, res, next) => {
  const plan = await StrategicPlan.create(req.body);

  res.status(201).json({
    success: true,
    data: plan,
  });
});

// @desc    Update strategic plan
// @route   PUT /api/strategic-plan/:id
// @access  Private (Admin)
exports.updateStrategicPlan = asyncHandler(async (req, res, next) => {
  let plan = await StrategicPlan.findById(req.params.id);

  if (!plan) {
    return res.status(404).json({
      success: false,
      error: 'Strategic plan not found',
    });
  }

  plan = await StrategicPlan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: plan,
  });
});

// @desc    Delete strategic plan
// @route   DELETE /api/strategic-plan/:id
// @access  Private (Admin)
exports.deleteStrategicPlan = asyncHandler(async (req, res, next) => {
  const plan = await StrategicPlan.findById(req.params.id);

  if (!plan) {
    return res.status(404).json({
      success: false,
      error: 'Strategic plan not found',
    });
  }

  await plan.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
