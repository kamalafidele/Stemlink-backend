const express = require('express');
const { check, validationResult } = require('express-validator');
const UserService = require('../../services/UserService');

const router = express.Router();

router.post(
  '/user-email-verification/verify',
  [
    check('verificationCode', 'verificationCode is Required').exists()
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { verificationCode } = req.body;
    try {
      const user = await UserService.getUserByVerificationCode(verificationCode);
      if (!user) return res.status(400).json({ error: 'We cannot find your account!' });

      await UserService.updateUserById(user._id, { isRegisterComplete: true, isActive: true });

      return res.status(200).json({ jwt_token: user.createToken() });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }
);

module.exports = router;
