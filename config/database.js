const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRESQL_URL);

sequelize.authenticate()
.then(() => {
  console.log('Connected to PostgreSQL via Amazon RDS successfully')
})
.catch(err => {
  console.error('Unable to connect to the hosted database: ', err);
});

module.exports = sequelize;