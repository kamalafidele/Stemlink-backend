const express = require('express');
const { check, validationResult } = require('express-validator');
const StudentProfileService = require('../../services/StudentProfileService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.get('/student/profile', jwt, async (req, res) => {
  const { _id: userId } = req.user;
  const profile = await StudentProfileService.getByUserId(userId);
  if (!profile) return res.status(404).json({ error: 'Student profile not found' });
  return res.status(200).json({ profile });
});

module.exports = router;