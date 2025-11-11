const express = require('express');
const { check, validationResult } = require('express-validator');
const MentorshipRelationshipService = require('../../services/MentorshipRelationshipService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.get('/my-mentorships', jwt, async (req, res) => {
  const { _id: userId, role } = req.user;
  let relationships;

  if (role === 'STUDENT') {
    relationships = await MentorshipRelationshipService.getByStudentId(userId);
  } else if (role === 'MENTOR') {
    relationships = await MentorshipRelationshipService.getByMentorId(userId);
  } else {
    return res.status(403).json({ error: 'Invalid role' });
  }

  return res.status(200).json({ relationships });
});

module.exports = router;