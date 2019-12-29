const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
User.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  return User.create({
    email: 't@t.com',
    password: 'test'
  });
});

module.exports = User;