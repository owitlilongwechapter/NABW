const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getContactMessages,
  getContactMessage,
  updateContactMessage,
  deleteContactMessage,
} = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');

router.route('/')
  .post(validateContact, submitContactMessage)
  .get(getContactMessages);

router.route('/:id')
  .get(getContactMessage)
  .put(updateContactMessage)
  .delete(deleteContactMessage);

module.exports = router;
