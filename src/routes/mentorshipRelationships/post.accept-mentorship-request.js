const express = require('express');
const { check, validationResult } = require('express-validator');
const MentorshipRelationshipService = require('../../services/MentorshipRelationshipService');
const UserService = require('../../services/UserService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.post(
  '/accept-mentorship-request',
  jwt,
  [check('mentorshipId').isMongoId()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { _id: mentorId } = req.user;
    const { mentorshipId } = req.body;

    const mentorshipRequest = await MentorshipRelationshipService.getById(mentorshipId);
    if (!mentorshipRequest || mentorshipRequest.mentor.toString() !== mentorId.toString() || mentorshipRequest.status !== 'PENDING') {
      return res.status(400).json({ error: 'Invalid mentorship request' });
    }

    const updatedRelationship = await MentorshipRelationshipService.updateById(mentorshipId, {
      status: 'ACTIVE',
    });

    return res.status(201).json({ relationship: updatedRelationship });
  }
);

module.exports = router;