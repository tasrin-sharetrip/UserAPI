const Auth = require("../models/auth");
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const db = require('../../config/db');

/*
  async keyword indicates that the function contains asynchronous operation and it will return a promise.
  This allows "await" to use within the function

  await keyword within async function pauses the execution of the function until the awaited promise is resolved or rejected.
  It is used to wait asyncronous operation to complete

  the await keyword in password hashing ensure that will indeed wait for the password hashing operation to complete before 
  moving on to the next part of the code.
*/

//register API
module.exports.register = async(req, res) => {
    const {first_name, last_name, email, password, NID, age, marital_status} = req.body;
    try {
        console.log(req.file);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Handle photo upload with Multer
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
  
        // Save the file path to the profile_photo field
        const profile_photo = req.file.path;

        // Start the transaction
        /*
          async (t) => {..} it is an anonymous asynchronous function that takes argument t.
          t parameter is commonly used to represent a transaction object when working with database.
          This transaction object is typically used to group a series of database operation together into a single transaction.
          
          Transaction is a way to ensure that either all operation within the transaction succeed, or none of them are
          applied, providing data consistency.
        */ 
        await db.transaction ( async (t) => {
            // create a user in the auth table
            /*
              { transaction: t } specifying that this operation should be part of the transaction defined by the t object.
            */ 
            const authUser = await Auth.create({ email, password: hashedPassword, auth_token: uuid.v4() }, { transaction: t });
        
            // create a user in the profile table
            await Profile.create({id: authUser.id, first_name, last_name, NID, profile_photo, age, marital_status }, { transaction: t });
            return res.status(200).json({ success: true, message : "User Registered Successfully"});
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Registration Failed"});
    }
}

//login API
module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        // find the user by email
        const user = await Auth.findOne({ where : {email} });
        if(!user){
            return res.status(401).json({success: false, message: "Authentication Failed"});
        }
        
        // password given during login & user.password coming from auth table
        const isPasswordValid = await bcrypt.compare(password, user.password); 
        if(!isPasswordValid){
            return res.status(401).json({success: false, message: "Authentication Failed"});
        }

        /*
          If email and password matched then return a random UUID so that next time we can use
          it for login and store this on auth_token in Auth table 
        */
        const newAuthToken = uuid.v4();
        user.auth_token = newAuthToken;
        await user.save();
        user.password = undefined; // it will not be present in response
        res.status(200).json({ success: true, message:"Login Successful", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Authentication failed' });
    }
}