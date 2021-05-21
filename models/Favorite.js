const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Favorite extends Model {}

Favorite.init(
    {
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the Primary Key
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
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['trail_id', 'user_id']
            }
        ],
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'favorite'
    }
);

module.exports = Favorite;