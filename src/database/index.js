const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User')
const Event = require('../models/Event')

const connection = new Sequelize(dbConfig);

User.init(connection); //Para utilizar o Model (User no caso)
Event.init(connection);

Event.associate(connection.models);
User.associate(connection.models);
/*
Toda vez que um init é realizado o model é cadastrado dentro da connection,
models contém o User e Event
*/

module.exports = connection;