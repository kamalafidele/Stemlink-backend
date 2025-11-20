const router = require('express').Router();

router.use('/', require('./get.my-mentorships'));
router.use('/', require('./post.mentorship-request'));
router.use('/', require('./post.end-mentorship'));
router.use('/', require('./post.accept-mentorship-request'));
router.use('/', require('./get.matching-recommendations'));

module.exports = router;