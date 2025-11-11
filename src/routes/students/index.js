const router = require('express').Router();

router.use('/', require('./get.all-students'));
router.use('/', require('./get.student-profile'));
router.use('/', require('./put.student-profile'));
router.use('/', require('./post.student-profile'));

module.exports = router;