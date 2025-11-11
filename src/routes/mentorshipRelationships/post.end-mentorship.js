const express = require('express');
const { check, validationResult } = require('express-validator');
const MentorshipRelationshipService = require('../../services/MentorshipRelationshipService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.post(
  '/:id/end',
  jwt,
  async (req, res) => {
    const { id } = req.params;
    const { _id: userId, role } = req.user;

    const relationship = await MentorshipRelationshipService.getById(id);
    if (!relationship) return res.status(404).json({ error: 'Mentorship not found' });

    const isParticipant = relationship.student.toString() === userId || relationship.mentor.toString() === userId;
    if (!isParticipant) return res.status(403).json({ error: 'Not authorized' });

    if (relationship.status !== 'ACTIVE') return res.status(400).json({ error: 'Mentorship already ended' });

    const updated = await MentorshipRelationshipService.updateById(id, {
      status: 'COMPLETED',
      endDate: new Date(),
    });

    return res.status(200).json({ relationship: updated });
  }
);

module.exports = router;