const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('newfreelance', 'springstudent', 'springstudent', {
  host: 'localhost',
  dialect: 'mysql',
});
module.exports = sequelize;
