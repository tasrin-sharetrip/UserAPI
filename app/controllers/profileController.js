const Auth = require("../models/auth");
const Profile = require("../models/profile");
const db = require('../../config/db');

module.exports.getProfile = async(req, res) => {
    try {
        // assuming that the userId is in the request parameter
        const userId = req.params.user_id; // user_id comes from profileRouter
        
        // extract the auth_token from request header
        const auth_token = req.headers.authorization;
        

        // find the user by auth token
        const user = await Auth.findOne({ where: {auth_token} });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Authentication failed' });
        }

        if(userId != user.id){
            return res.status(401).json({ success: false, message: 'Unauthorized to view this profile' });
        }

        const id = user.id;
        console.log(id);
        const profile = await Profile.findOne({ where: {id}});
        if(!profile){
            return res.status(401).json({ success: false, message: 'Profile not found' });
        }

        // Remove the 'password' field from the response
        delete profile.dataValues.password;

        res.status(200).json({ success: true, profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error getting profile' });
    }
}

module.exports.updateProfile = async(req, res) => {
    try {
        // assuming that the userId is in the request parameter
        const userId = req.params.user_id; // user_id comes from profileRouter
        
        // extract the auth_token from request header
        const auth_token = req.headers.authorization;
        

        // find the user by auth token
        const user = await Auth.findOne({ where: {auth_token} });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Authentication failed' });
        }

        if(userId != user.id){
            return res.status(401).json({ success: false, message: 'Unauthorized to update this profile' });
        }

        const id = user.id;
        const profile = await Profile.findOne({ where: {id}});
        if(!profile){
            return res.status(401).json({ success: false, message: 'Profile not found' });
        }

        const updatedUser = req.body;

        await profile.update(updatedUser);
        res.status(200).json({ success: true, message: 'Profile updated successfully', profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating profile' });
    }
}