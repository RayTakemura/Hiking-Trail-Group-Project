const Favorite = require("./Favorite");
const Trail = require("./Trail");
const User = require("./User");
const Vote = require("./Vote");
const Comment = require('./Comment');

/**
 * Trail/User many to many through Favorite
 */
Trail.hasMany(Favorite, {
    foreignKey: 'trail_id'
});

Favorite.belongsTo(Trail, {
    foreignKey: 'trail_id'
});

User.hasMany(Favorite,{
    foreignKey: 'user_id'
});

Favorite.belongsTo(User, {
    foreignKey: 'user_id'
})

Trail.belongsToMany(User, {
    through: Favorite,
    as: 'favorite_trail',
    foreignKey: 'trail_id'
});

User.belongsToMany(Trail, {
    through: Favorite,
    as: 'favorite_trail',
    foreignKey: 'user_id'
});

/**
 * Trail/User many to many through Comment
 */
Trail.hasMany(Comment, {
    foreignKey: 'trail_id'
});

Comment.belongsTo(Trail, {
    foreignKey: 'trail_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Trail.belongsToMany(User, {
    through: Comment,
    as: 'trail_comment',
    foreignKey: 'trail_id'
});

User.belongsToMany(Trail, {
    through: Comment,
    as: 'trail_Comment',
    foreignKey: 'user_id'
});

/**
 * User/Comment association through Vote
 */

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.hasMany(Vote, {
    foreignKey: 'comment_id'
});

Vote.belongsTo(Comment, {
    foreignKey: 'comment_id'
});

User.belongsToMany(Comment, {
    through: Vote,
    as: "comment_vote",
    foreignKey: 'user_id'
});

Comment.belongsToMany(User, {
    through: Vote,
    as: 'comment_vote',
    foreignKey: 'comment_id'
});


module.exports = {Trail, User, Favorite, Comment, Vote};

