const express = require('express');
const { check, validationResult } = require('express-validator');
const StudentProfileService = require('../../services/StudentProfileService');
const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.get('/students', jwt, async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  const students = await StudentProfileService.getAllWithPagination(parseInt(skip), parseInt(limit));
  return res.status(200).json({ students });
});

module.exports = router;