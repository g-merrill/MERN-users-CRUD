const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

let db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;

module.exports = db;