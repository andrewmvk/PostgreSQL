const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User')

const connection = new Sequelize(dbConfig);

User.init(connection); //Para utilizar o Model (User no caso)

module.exports = connection;