const express = require('express');
const router = express.Router();
const {
  createMembershipApplication,
  getMembershipApplications,
  getMembershipApplication,
  updateMembershipApplication,
  deleteMembershipApplication,
} = require('../controllers/membershipController');
const { validateMembership } = require('../middleware/validation');

router.route('/')
  .post(validateMembership, createMembershipApplication)
  .get(getMembershipApplications);

router.route('/:id')
  .get(getMembershipApplication)
  .put(updateMembershipApplication)
  .delete(deleteMembershipApplication);

module.exports = router;
