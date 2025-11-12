const express = require('express');
const { check, validationResult } = require('express-validator');
const ReviewService = require('../../services/ReviewService');
const MentorshipRelationshipService = require('../../services/MentorshipRelationshipService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;


router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const reviews = await ReviewService.getByRevieweeId(userId);
  const avg = await ReviewService.getAverageRating(userId);
  const { averageRating = 0, totalReviews = 0 } = avg || {};

  return res.status(200).json({
    reviews,
    summary: { averageRating: parseFloat(averageRating.toFixed(2)), totalReviews },
  });
});

module.exports = router;