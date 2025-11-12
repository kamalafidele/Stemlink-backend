const router = require('express').Router();

router.use('/auth/', require('./users'));
router.use('/mentors/', require('./mentors'));
router.use('/students/', require('./students'));
router.use('/reviews/', require('./reviews'));
router.use('/mentorships/', require('./mentorshipRelationships'));


module.exports = router;
