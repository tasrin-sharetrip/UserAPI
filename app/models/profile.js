const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Profile = db.define('profile', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false, // means This column is required
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  NID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profile_photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  marital_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Profile;