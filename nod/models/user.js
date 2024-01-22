const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  user_name: {
    type: DataTypes.STRING,
    unique: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },biyografi: {
    type: DataTypes.STRING,
  },age: {
    type: DataTypes.STRING,
  },school: {
    type: DataTypes.STRING,
  },skills: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: false, // Bu, createdAt ve updatedAt sütunlarını devre dışı bırakır

  sequelize,
  modelName: 'users',
});

module.exports = User;
