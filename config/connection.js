// use sequelize npm package
const Sequelize  = require('sequelize');

// use dotenv package
require('dotenv').config();

// create constant sequelize variable to export out into the server
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = sequelize;