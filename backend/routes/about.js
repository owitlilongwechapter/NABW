const express = require('express');
const router = express.Router();
const {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
} = require('../controllers/aboutController');
const { validateAbout } = require('../middleware/validation');

router.route('/')
  .get(getAbout)
  .post(validateAbout, createAbout);

router.route('/:id')
  .put(validateAbout, updateAbout)
  .delete(deleteAbout);

module.exports = router;
