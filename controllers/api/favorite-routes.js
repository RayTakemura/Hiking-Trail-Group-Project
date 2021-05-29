const router = require('express').Router();
const { Trail, User, Vote, Comment, Favorite } = require('../../models');
const sequelize = require('../../config/connection');


//get all favorites
router.get('/', (req, res) => {
    Favorite.findAll({
      attributes: 
      [
        'id', 
        'trail_id', 
        [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE favorite.id = favorite.trail_id)'), 'favorite_count']
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbFavoritedata => res.json(dbFavoritedata))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// get a single favorite
router.get('/:id', (req, res) => {
    Favorite.findOne({
      where: {
        id: req.params.id
      },
      attributes:
      [
        'id', 
        'trail_id', 
        [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE trail.id = favorite.trail_id)'), 'favorite_count']
      ],
      include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'trail_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbFavoritedata => {
        if (!dbFavoritedata) {
          res.status(404).json({ message: 'No favorite found with this id' });
          return;
        }
        res.json(dbFavoritedata);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// add a trail to favorites
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', trail_url: 'https://taskmaster.com/press', user_id: 1}
    Favorite.create({
      trail_id: req.body.trail_id,
      user_id: req.session.user_id
    })
      .then(dbFavoritedata => res.json(dbFavoritedata))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// PUT /api/trails/favorite
router.put('/favorite', (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Favorite.update({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedFavoriteData => res.json(updatedFavoriteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// delete a favorite
router.delete('/:id', (req, res) => {
  Favorite.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbFavoritedata => {
        if (!dbFavoritedata) {
          res.status(404).json({ message: 'No trail found with this id' });
          return;
        }
        res.json(dbFavoritedata);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;