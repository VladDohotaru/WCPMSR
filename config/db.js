 
'use strict';

const Sequelize = require('sequelize');
// initialize an instance of Sequelize
const connection = new Sequelize({
  database: 'Betano',
  username: 'root',
  password: 'dev',
  dialect:  'mysql',
});
// check the databse connection
connection
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = connection;