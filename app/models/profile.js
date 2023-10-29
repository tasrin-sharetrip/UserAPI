const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const Auth = require('./auth'); // Import the Auth model

const Profile = db.define('profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
        model: Auth, // Referenced model
        key: 'id',    // Referenced column
    },
  },
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