const express = require('express');
const UserService = require('../../services/UserService');
const JWTService = require('../../services/JWTService');

const jwt = JWTService.verifyToken;

const router = express.Router();

router.get('/account', jwt, async (req, res, next) => {
  const { _id } = req.user;

  const user = await UserService.getUserById(_id);
  return res.status(200).json({ user });
});

module.exports = router;
