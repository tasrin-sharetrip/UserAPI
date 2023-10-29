const Sequelize = require('sequelize');

const sequelize = new Sequelize('user_reg_login_assignment_1', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;