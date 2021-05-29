const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Trail extends Model {}

Trail.init(
    {
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the Primary Key
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        crossstreets: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        transit: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lng: {
            type: DataTypes.STRING,
            allowNull: true
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        lighting: {
            type: DataTypes.STRING,
            allowNull: true
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        surface: {
            type: DataTypes.STRING,
            allowNull: true
        },
        parking: {
            type: DataTypes.STRING,
            allowNull: true
        },
        facilities: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hours: {
            type: DataTypes.STRING,
            allowNull: true
        },
        loopcount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        satImgUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        largeImgURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        thumbURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        published: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ratings: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ModifiedTime:{
            type: DataTypes.STRING,
            allowNull: true
        },
        reviews: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'trail'
    }
);

module.exports = Trail;