const express = require('express');
const { check, validationResult } = require('express-validator');
const ReviewService = require('../../services/ReviewService');
const MentorshipRelationshipService = require('../../services/MentorshipRelationshipService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;


router.post(
  '/add-new',
  jwt,
  [
    check('revieweeId').exists().isMongoId(),
    check('rating').exists().isInt({ min: 1, max: 5 }),
    check('comment').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { _id: reviewerId, role } = req.user;
    const { revieweeId, rating, comment } = req.body;

    if (reviewerId.toString() === revieweeId) {
      return res.status(400).json({ error: 'You cannot review yourself' });
    }

    if (role !== 'STUDENT' && role !== 'MENTOR') {
      return res.status(403).json({ error: 'Only students and mentors can add reviews' });
    }

    let isMentor, isStudent, relationships;

    if (role === 'STUDENT') {
        relationships = await MentorshipRelationshipService.getByStudentId(reviewerId);
        isMentor = relationships.some(rel => rel.mentor._id.toString() === revieweeId);
        if (!isMentor) {
          return res.status(403).json({ error: 'You can only review your mentor' });
        }
    } else if (role === 'MENTOR') {
        relationships = await MentorshipRelationshipService.getByMentorId(reviewerId);
        isStudent = relationships.some(rel => rel.student._id.toString() === revieweeId);
        if (!isStudent) {
          return res.status(403).json({ error: 'You can only review your student' });
        }
    }

    const review = await ReviewService.create({
      reviewer: reviewerId,
      reviewee: revieweeId,
      rating,
      comment,
    });

    return res.status(201).json({ review });
  }
);

module.exports = router;