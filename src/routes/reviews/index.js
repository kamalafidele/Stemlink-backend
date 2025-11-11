const router = require('express').Router();

router.use('/', require('./get.my-reviews'));
router.use('/', require('./post.add-review'));
router.use('/', require('./get.user-reviews'));

module.exports = router;