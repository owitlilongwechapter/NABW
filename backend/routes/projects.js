const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { validateProject } = require('../middleware/validation');

router.route('/')
  .get(getProjects)
  .post(validateProject, createProject);

router.route('/featured').get(getFeaturedProjects);

router.route('/:slug')
  .get(getProject);

router.route('/:id')
  .put(validateProject, updateProject)
  .delete(deleteProject);

module.exports = router;
