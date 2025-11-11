const router = require('express').Router();

router.use('/', require('./get.all-mentors'));
router.use('/', require('./get.mentor[id]'));
router.use('/', require('./put.mentor-profile'));
router.use('/', require('./post.mentor-profile'));
router.use('/', require('./get.mentor-profile'));

module.exports = router;
