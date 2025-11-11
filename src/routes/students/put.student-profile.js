const express = require('express');
const { check, validationResult } = require('express-validator');
const StudentProfileService = require('../../services/StudentProfileService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.put(
  '/student/profile',
  jwt,
  [
    check('bio').optional().isString(),
    check('dateOfBirth').optional().isISO8601(),
    check('address.province').optional().isString(),
    check('address.district').optional().isString(),
    check('educationLevel').optional().isIn(['PRIMARY', 'HIGH_SCHOOL', 'BACHELORS', 'MASTERS', 'PHD']),
    check('schoolName').optional().isString(),
    check('communityType').optional().isIn(['URBAN', 'RURAL', 'SUBURBAN']),
    check('stemInterests').optional().isArray(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { _id: userId } = req.user;
    const profile = await StudentProfileService.getByUserId(userId);
    if (!profile) return res.status(404).json({ error: 'Student profile not found' });

    const updated = await StudentProfileService.updateByUserId(userId, req.body);
    return res.status(200).json({ profile: updated });
  }
);

module.exports = router;