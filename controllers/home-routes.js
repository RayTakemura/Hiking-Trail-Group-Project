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

// get all trails by city name
router.get('/trail/city/:city', (req, res) => {
  Trail.findAll({
    where: {
      city: req.params.city
    },
    attributes: {
      include: [
        [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE trail.id = favorite.trail_id)'), 'favorite_count']
      ]
    },
      include: [
        {
          model: Comment,
          attributes: ['trail_id','comment_text','user_id', 'created_at','updated_at','id'],
          include: {
            model: Vote,
            attributes: ['comment_id', 'user_id', 'id']
          }
        }
      ]
  })
    .then(dbTrailData => {
      if (!dbTrailData) {
        res.status(404).json({ message: 'No trail found with this city name' });
        return;
      }
      // res.json(dbTrailData);
      // serialize the data
      const trail = dbTrailData.map( trail => trail.get({ plain: true }));
      const city = trail[0].city;

      // pass data to template
      res.render('search-result', { trail, loggedIn: req.session.loggedIn, city}
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all trails by zip code
router.get('/trail/zip/:zip', (req, res) => {
  Trail.findAll({
    where: {
      zip: req.params.zip
    },
    attributes: {
      include: [
        [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE trail.id = favorite.trail_id)'), 'favorite_count']
      ]
    },
      include: [
        {
          model: Comment,
          attributes: ['trail_id','comment_text','user_id', 'created_at','updated_at','id'],
          include: {
            model: Vote,
            attributes: ['comment_id', 'user_id', 'id']
          }
        }
      ]
  })
    .then(dbTrailData => {
      if (!dbTrailData) {
        res.status(404).json({ message: 'No trail found with this zip code' });
        return;
      }
      const trail = dbTrailData.map( trail => trail.get({ plain: true }));
      const zip = trail[0].zip;

      // pass data to template
      res.render('search-result', { trail, loggedIn: req.session.loggedIn, zip}
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all trails by zip code
router.get('/trail/name/:name', (req, res) => {
  Trail.findAll({
    where: {
      name: req.params.name
    },
    attributes: {
      include: [
        [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE trail.id = favorite.trail_id)'), 'favorite_count']
      ]
    },
      include: [
        {
          model: Comment,
          attributes: ['trail_id','comment_text','user_id', 'created_at','updated_at','id'],
          include: {
            model: Vote,
            attributes: ['comment_id', 'user_id', 'id']
          }
        }
      ]
  })
    .then(dbTrailData => {
      if (!dbTrailData) {
        res.status(404).json({ message: 'No trail found with this name' });
        return;
      }
      const trail = dbTrailData.map( trail => trail.get({ plain: true }));
      const name = trail[0].name;

      // pass data to template
      res.render('search-result', { trail, loggedIn: req.session.loggedIn, name}
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;