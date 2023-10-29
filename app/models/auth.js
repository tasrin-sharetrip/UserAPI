const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Auth = db.define('auth', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  auth_token: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
});

module.exports = Auth;
