const router = require('express').Router();

router.use('/auth/', require('./users'));
// router.use('/transactions/', require('./transactions'));

module.exports = router;
