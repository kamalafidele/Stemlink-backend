const express = require('express');
const { check, validationResult } = require('express-validator');
const ReviewService = require('../../services/ReviewService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.get('/added-by-me', jwt, async (req, res) => {
  const { _id: reviewerId } = req.user;
  const reviews = await ReviewService.getByReviewerId(reviewerId);
  return res.status(200).json({ reviews });
});

module.exports = router;