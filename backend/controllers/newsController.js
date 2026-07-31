const News = require('../models/News');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all published news
// @route   GET /api/news
// @access  Public
exports.getNews = asyncHandler(async (req, res, next) => {
  const news = await News.find({ isPublished: true }).sort('-publishedAt');

  res.status(200).json({
    success: true,
    count: news.length,
    data: news,
  });
});

// @desc    Get featured news
// @route   GET /api/news/featured
// @access  Public
exports.getFeaturedNews = asyncHandler(async (req, res, next) => {
  const news = await News.find({ isFeatured: true, isPublished: true })
    .sort('-publishedAt')
    .limit(6);

  res.status(200).json({
    success: true,
    count: news.length,
    data: news,
  });
});

// @desc    Get single news by slug
// @route   GET /api/news/:slug
// @access  Public
exports.getNewsItem = asyncHandler(async (req, res, next) => {
  const item = await News.findOne({ slug: req.params.slug, isPublished: true });

  if (!item) {
    return res.status(404).json({
      success: false,
      error: 'News item not found',
    });
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

// @desc    Create new news item
// @route   POST /api/news
// @access  Private (Admin)
exports.createNews = asyncHandler(async (req, res, next) => {
  const item = await News.create(req.body);

  res.status(201).json({
    success: true,
    data: item,
  });
});

// @desc    Update news item
// @route   PUT /api/news/:id
// @access  Private (Admin)
exports.updateNews = asyncHandler(async (req, res, next) => {
  let item = await News.findById(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      error: 'News item not found',
    });
  }

  item = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: item,
  });
});

// @desc    Delete news item
// @route   DELETE /api/news/:id
// @access  Private (Admin)
exports.deleteNews = asyncHandler(async (req, res, next) => {
  const item = await News.findById(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      error: 'News item not found',
    });
  }

  await item.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
