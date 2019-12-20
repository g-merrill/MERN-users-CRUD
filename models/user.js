// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   firstName: {type: String},
//   lastName: {type: String},
//   username: {type: String, unique: true},
//   email: {type: String, required: true, unique: true},
//   password: {type: String, required: true},
// },{
//   timestamps: true
// });

// module.exports = mongoose.model('User', userSchema);


const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRESQL_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL via Amazon RDS successfully')
  })
  .catch(err => {
    console.error('Unable to connect to the hosted database: ', err);
  });

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
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
    email: 'test@email.com',
    password: 'test'
  });
});

let db = {};
db.User = User;
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;