const express = require('express');
const JWTService = require('../../services/JWTService');
const MentorProfileService = require('../../services/MentorProfileService');

const router = express.Router();

router.get('/by-id/:id', async (req, res) => {
  const { id } = req.params;
  const mentor = await MentorProfileService.getById(id);
  if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

  return res.status(200).json({ mentor });
});

module.exports = router;