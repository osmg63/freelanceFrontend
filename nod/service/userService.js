const User = require('../models/user');

async function getUserByUsername(user_name) {
  return User.findOne({
    where: {
      user_name: user_name,
    },
  });
}
function sayHello() {
    return "Hello, World!";
}
async function getAllUsers() {
    return User.findAll();
  }
  async function addUser(userDetails) {
    try {
      const newUser = await User.create(userDetails);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
  getUserByUsername,
  sayHello,
  getAllUsers,
  addUser,
};
