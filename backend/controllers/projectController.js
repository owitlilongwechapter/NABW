const Project = require('../models/Project');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({ isPublished: true })
    .populate('partners', 'name logo')
    .populate('relatedProjects', 'title slug featuredImage shortDescription')
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
// @access  Public
exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findOne({ slug: req.params.slug, isPublished: true })
    .populate('partners', 'name logo website')
    .populate('relatedProjects', 'title slug featuredImage shortDescription');

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found',
    });
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
exports.getFeaturedProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({ isFeatured: true, isPublished: true })
    .populate('partners', 'name logo')
    .sort('-createdAt')
    .limit(6);

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
exports.createProject = asyncHandler(async (req, res, next) => {
  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    data: project,
  });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
exports.updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found',
    });
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: project,
  });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found',
    });
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
