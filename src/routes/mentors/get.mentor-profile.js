const express = require('express');
const JWTService = require('../../services/JWTService');

const jwt = JWTService.verifyToken;

const router = express.Router();

router.get('/profile', jwt, async (req, res) => {
  const { _id: userId } = req.user;
  const profile = await MentorProfileService.getByUserId(userId);
  if (!profile) return res.status(404).json({ error: 'Mentor profile not found' });
  
  return res.status(200).json({ profile });
});

module.exports = router;