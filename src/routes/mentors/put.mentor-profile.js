const express = require('express');
const JWTService = require('../../services/JWTService');
const MentorProfileService = require('../../services/MentorProfileService');
const { check, validationResult } = require('express-validator');

const jwt = JWTService.verifyToken;

const router = express.Router();

router.put(
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
    const profile = await MentorProfileService.getByUserId(userId);
    if (!profile) return res.status(404).json({ error: 'Mentor profile not found' });

    const updated = await MentorProfileService.updateByUserId(userId, req.body);
    return res.status(200).json({ profile: updated });
  }
);

module.exports = router;