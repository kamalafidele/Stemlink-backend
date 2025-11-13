const express = require('express');
const JWTService = require('../../services/JWTService');
const { check, validationResult } = require('express-validator');
const MentorProfileService = require('../../services/MentorProfileService');

const jwt = JWTService.verifyToken;

const router = express.Router();

router.post(
  '/profile',
  jwt,
  [
    check('bio').optional().isString(),
    check('profession').optional().isString(),
    check('dateOfBirth').optional().isISO8601(),
    check('expertiseAreas').optional().isArray(),
    check('yearsOfExperience').optional().isInt({ min: 0 }),
    check('educationBackground').optional().isString(),
    check('availability').optional().isIn(['WEEKDAYS', 'WEEKENDS', 'EVENINGS']),
    check('stemFields').optional().isArray(),
    check('maxMentees').optional().isInt({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { _id: userId } = req.user;
    const data = { ...req.body, user: userId };

    const existing = await MentorProfileService.getByUserId(userId);
    if (existing) return res.status(400).json({ error: 'Mentor profile already exists' });

    const profile = await MentorProfileService.create(data);
    return res.status(201).json({ profile });
  }
);


module.exports = router;