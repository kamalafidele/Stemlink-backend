const express = require('express');
const router = express.Router();
const {
  getJourney,
  createJourney,
  updateSkill,
  removeSkill,
  addGoal,
  updateGoal,
  removeGoal,
  addMilestone,
  addOutcome,
  updateOutcomes
} = require('./journey-tracker-routes');
const { authenticate } = require('../../middleware/auth'); // Adjust path as needed

// All routes require authentication
router.use(authenticate);

// Get journey tracker
router.get('/', getJourney);

// Create journey tracker
router.post('/', createJourney);

// Skills
router.post('/skills', updateSkill);
router.delete('/skills/:skillName', removeSkill);

// Goals
router.post('/goals', addGoal);
router.put('/goals/:goalId', updateGoal);
router.delete('/goals/:goalId', removeGoal);

// Milestones
router.post('/milestones', addMilestone);

// Outcomes
router.post('/outcomes', addOutcome);
router.put('/outcomes', updateOutcomes);

module.exports = router;