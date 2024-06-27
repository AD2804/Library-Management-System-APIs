const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lms', 'root', 'Aaditya@2004', {
  host: 'localhost',
  dialect: 'mysql',
  sync: { force: false },
  logging: console.log, 
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
