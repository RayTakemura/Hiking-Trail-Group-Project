const router = require('express').Router();
const sequelize = require('../config/connection');
const {Comment, Favorite, Trail, User, Vote} = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', { 
      loggedIn: req.session.loggedIn
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login', { 
      loggedIn: req.session.loggedIn
    });
});

router.get('/single-trail', (req, res) => {
  res.render('single-trail', { 
    loggedIn: req.session.loggedIn
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', { 
    loggedIn: req.session.loggedIn
  });
});

router.get('/search', (req, res) => {
  res.render('search', { 
    loggedIn: req.session.loggedIn
  });
});

// get a single trail
router.get('/trail/:id', (req, res) => {
  Trail.findOne({
    where: {
      id: req.params.id
    },
    attributes: {
      include: [
        [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE trail.id = favorite.trail_id)'), 'favorite_count']
      ]
    },
      include: [
        {
          model: Comment,
          attributes: {
            // include: [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE comment.id = vote.comment_id)'), 'vote_count']
            // include: [sequelize.literal('(SELECT COUNT(*) FROM vote v INNER JOIN comment c ON v.comment_id = c.id)'), 'vote_count']
            include: [[sequelize.literal('(SELECT COUNT(*) FROM vote INNER JOIN comment ON vote.comment_id = comment.id)'), 'vote_count']]
          }
          ,
          include: {
            model: User,
            attributes: ['username']
          }
          // include: {
          //   model: Vote,
          //   attributes: ['comment_id', 'user_id', 'id']
          // }
        }
      ]
  })
    .then(dbTrailData => {
      if (!dbTrailData) {
        res.status(404).json({ message: 'No trail found with this id' });
        return;
      }

      // serialize the data
      const trail = dbTrailData.get({ plain: true });

      // pass data to template
      res.render('single-trail', { trail, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;