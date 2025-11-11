const express = require('express');
const JWTService = require('../../services/JWTService');
const MentorProfileService = require('../../services/MentorProfileService');

const jwt = JWTService.verifyToken;

const router = express.Router();

// GET /mentors/get-all?skip=0&limit=10 - Retrieve all mentor profiles with pagination

router.get('/get-all', async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  const mentors = await MentorProfileService.getAllWithPagination(parseInt(skip), parseInt(limit));
  return res.status(200).json({ mentors });
});

module.exports = router;