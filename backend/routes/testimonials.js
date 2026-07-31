const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { validateTestimonial } = require('../middleware/validation');

router.route('/')
  .get(getTestimonials)
  .post(validateTestimonial, createTestimonial);

router.route('/:id')
  .get(getTestimonial)
  .put(validateTestimonial, updateTestimonial)
  .delete(deleteTestimonial);

module.exports = router;
