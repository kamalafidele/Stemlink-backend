const router = require('express').Router();

router.use('/', require('./post.login'));
router.use('/', require('./post.signup'));
router.use('/', require('./get.user'));
router.use('/', require('./post.verify-email'));

module.exports = router;
