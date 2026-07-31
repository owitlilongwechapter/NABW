const express = require('express');
const router = express.Router();
const {
  getFAQs,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} = require('../controllers/faqController');
const { validateFAQ } = require('../middleware/validation');

router.route('/')
  .get(getFAQs)
  .post(validateFAQ, createFAQ);

router.route('/:id')
  .get(getFAQ)
  .put(validateFAQ, updateFAQ)
  .delete(deleteFAQ);

module.exports = router;
