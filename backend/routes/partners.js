const express = require('express');
const router = express.Router();
const {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner,
} = require('../controllers/partnerController');
const { validatePartner } = require('../middleware/validation');

router.route('/')
  .get(getPartners)
  .post(validatePartner, createPartner);

router.route('/:id')
  .get(getPartner)
  .put(validatePartner, updatePartner)
  .delete(deletePartner);

module.exports = router;
