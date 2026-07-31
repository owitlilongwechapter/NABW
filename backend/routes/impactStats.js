const express = require('express');
const router = express.Router();
const {
  getImpactStats,
  getImpactStat,
  createImpactStat,
  updateImpactStat,
  deleteImpactStat,
} = require('../controllers/impactStatController');
const { validateImpactStat } = require('../middleware/validation');

router.route('/')
  .get(getImpactStats)
  .post(validateImpactStat, createImpactStat);

router.route('/:id')
  .get(getImpactStat)
  .put(validateImpactStat, updateImpactStat)
  .delete(deleteImpactStat);

module.exports = router;
