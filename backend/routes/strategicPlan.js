const express = require('express');
const router = express.Router();
const {
  getStrategicPlan,
  createStrategicPlan,
  updateStrategicPlan,
  deleteStrategicPlan,
} = require('../controllers/strategicPlanController');
const { validateStrategicPlan } = require('../middleware/validation');

router.route('/')
  .get(getStrategicPlan)
  .post(validateStrategicPlan, createStrategicPlan);

router.route('/:id')
  .put(validateStrategicPlan, updateStrategicPlan)
  .delete(deleteStrategicPlan);

module.exports = router;
