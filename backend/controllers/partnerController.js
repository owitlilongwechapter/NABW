const Partner = require('../models/Partner');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all published partners
// @route   GET /api/partners
// @access  Public
exports.getPartners = asyncHandler(async (req, res, next) => {
  const partners = await Partner.find({ isPublished: true }).sort('name');

  res.status(200).json({
    success: true,
    count: partners.length,
    data: partners,
  });
});

// @desc    Get single partner by ID
// @route   GET /api/partners/:id
// @access  Public
exports.getPartner = asyncHandler(async (req, res, next) => {
  const partner = await Partner.findById(req.params.id);

  if (!partner || !partner.isPublished) {
    return res.status(404).json({
      success: false,
      error: 'Partner not found',
    });
  }

  res.status(200).json({
    success: true,
    data: partner,
  });
});

// @desc    Create new partner
// @route   POST /api/partners
// @access  Private (Admin)
exports.createPartner = asyncHandler(async (req, res, next) => {
  const partner = await Partner.create(req.body);

  res.status(201).json({
    success: true,
    data: partner,
  });
});

// @desc    Update partner
// @route   PUT /api/partners/:id
// @access  Private (Admin)
exports.updatePartner = asyncHandler(async (req, res, next) => {
  let partner = await Partner.findById(req.params.id);

  if (!partner) {
    return res.status(404).json({
      success: false,
      error: 'Partner not found',
    });
  }

  partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: partner,
  });
});

// @desc    Delete partner
// @route   DELETE /api/partners/:id
// @access  Private (Admin)
exports.deletePartner = asyncHandler(async (req, res, next) => {
  const partner = await Partner.findById(req.params.id);

  if (!partner) {
    return res.status(404).json({
      success: false,
      error: 'Partner not found',
    });
  }

  await partner.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
