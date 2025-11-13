const express = require('express');
const { check, validationResult } = require('express-validator');
const { v4: uuid } = require('uuid');
const UserService = require('../../services/UserService');
// const EmailService = require('../../services/EmailService');

const router = express.Router();
const { STEMLINK_EMAIL } = process.env;

router.post(
  '/register',
  [
    check('firstName', 'FirstName is required').exists(),
    check('lastName', 'LastName is required').exists(),
    check('role', 'Role is required').exists().isIn(['STUDENT', 'MENTOR']),
    check('email').exists().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password, role, phoneNumber } = req.body;

    const mail = email.toLowerCase();
    try {
      const checkMail = await UserService.getUserByEmail(mail);
      if (checkMail) return res.status(400).json({ status: 'Email Already Exist' });

      const verificationCode = uuid();
      const user = await UserService.create({
        firstName,
        lastName,
        email: mail,
        password,
        verificationCode,
        isRegisterComplete: true,
        isActive: true,
        role,
        phoneNumber,
        preferredLanguage: 'ENGLISH'
      });

      // const subject = 'Email verification with StemLink';
      // const html = EmailService.generateWelcomeEmailHtml({
      //   name: firstName + lastName,
      //   verificationCode,
      // });

      // const result = await EmailService.sendEmail(user.email, subject, html);
      // console.log("Email sent: ", result);

      return res.status(200).json({ status: 'registered succefully' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e });
    }
  }
);

module.exports = router;
