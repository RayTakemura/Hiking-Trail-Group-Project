const router = require('express').Router();
const { Trail, User, Vote, Comment, Favorite } = require('../../models');
const sequelize = require('../../config/connection');


//get all trails
router.get('/', (req, res) => {
    Trail.findAll({
      attributes: 
      [
        'id', 
        'trail_name', 
        'location', 
        [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE trail.id = favorite.trail_id)'), 'favorite_count']
      ],
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
      .then(dbTrailData => res.json(dbTrailData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// get a single trail
router.get('/:id', (req, res) => {
    Trail.findOne({
      where: {
        id: req.params.id
      },
      attributes:
      [
        'id', 
        'trail_name', 
        'location', 
        [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE trail.id = favorite.trail_id)'), 'favorite_count']
      ],
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
          res.status(404).json({ message: 'No trail found with this id' });
          return;
        }
        res.json(dbTrailData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// router.post('/:id', (req,res) => {

// })

// PUT /api/trails/favorite
router.put('/favorite', (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Trail.update({ ...req.body, user_id: req.session.user_id }, { Favorite, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// delete a trail
router.delete('/:id', (req, res) => {
    Trail.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbTrailData => {
        if (!dbTrailData) {
          res.status(404).json({ message: 'No trail found with this id' });
          return;
        }
        res.json(dbTrailData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;