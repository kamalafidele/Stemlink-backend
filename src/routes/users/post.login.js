const express = require('express');
const { check, validationResult } = require('express-validator');
const UserService = require('../../services/UserService');

const router = express.Router();

router.post(
  '/login',
  [check('email', 'Email is Required').exists().isEmail(), check('password', 'Password is Required').exists()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email.toLowerCase());
    if (!user) return res.status(400).json({ status: 'Please check your Email or Password' });
    
    if (!user.isRegisterComplete) return res.status(400).json({ status: 'Please verify your email' });

    const correctPassword = await user.comparePassword(password);

    if (!correctPassword) return res.status(400).json({ status: 'Please check your Email or Password' });

    return res.status(200).json({ jwt_token: user.createToken(), user });
  }
);

module.exports = router;
