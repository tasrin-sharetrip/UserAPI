const express = require('express');
const app = express();
require("dotenv").config() // only this require will supply .env file all over project(I think)
const port = process.env.API_PORT;
const authRoutes = require('./app/routes/authRoutes');
const profileRoutes = require('./app/routes/profileRoutes');

app.use(express.json());

// Import Sequelize
const db = require('./config/db');

// Import models
const Auth = require('./app/models/auth');
const Profile = require('./app/models/profile');


/* // Associate the models if needed
  Auth.hasOne(Profile, { foreignKey: 'authId' });
  Profile.belongsTo(Auth, { foreignKey: 'authId' });
*/

// Synchronize models with the database (creates tables if they don't exist)
db.sync() //{force: true}
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
});

// Register your routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.get('/', (req, res) => {
    res.send('Hello Happy!')
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});