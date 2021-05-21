const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        trail_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'trail',
                key: 'id'
            }
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        freezeTableName: true,
        modelName: 'comment'
    }
);

module.exports = Comment;