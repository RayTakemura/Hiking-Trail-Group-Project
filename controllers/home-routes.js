const router = require('express').Router();
const sequelize = require('../config/connection');
const {Comment, Favorite, Trail, User, Vote} = require('../models');

router.get('/', (req, res) => {
    res.render('homepage')
})

module.exports = router;