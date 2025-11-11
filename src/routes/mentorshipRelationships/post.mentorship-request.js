const express = require('express');
const { check, validationResult } = require('express-validator');
const MentorshipRelationshipService = require('../../services/MentorshipRelationshipService');
const UserService = require('../../services/UserService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.post(
  '/send-request',
  jwt,
  [check('mentorId').isMongoId()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { _id: studentId } = req.user;
    const { mentorId } = req.body;

    const mentor = await UserService.getUserById(mentorId);
    if (!mentor || mentor.role !== 'MENTOR') return res.status(400).json({ error: 'Invalid mentor' });

    const existing = await MentorshipRelationshipService.checkMentorshipExists(studentId, mentorId);
    if (existing) return res.status(400).json({ error: 'Mentorship relationship already exists' });

    const relationship = await MentorshipRelationshipService.create({
      student: studentId,
      mentor: mentorId,
      status: 'PENDING',
    });

    return res.status(201).json({ relationship });
  }
);

module.exports = router;