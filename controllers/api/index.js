//index.js inthe api

const router = require('express').Router();

const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const favoriteRoutes = require('./favorite-routes');
const trailRoutes = require('./trail-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/favorites',favoriteRoutes );
router.use('/trails', trailRoutes);

module.exports = router;