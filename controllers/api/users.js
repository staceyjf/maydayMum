const userModel = require("../../models/user");
const User = userModel.User; // User alias
const Nanny = require("../../models/nanny");
const Parent = require('../../models/parent');
const Availability = require("../../models/availability");
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
};

// will pass on a token to the users-api.jsx
async function create(req, res) {
    try {
      const fullUserProfile = await User.createFullUserProfile(req.body);
      console.log('this is fullUserProfile:', fullUserProfile);
      const token = userModel.createJWT(fullUserProfile);
      console.log('User created with complete profile', fullUserProfile);
      res.json(token);
    } catch (err) {
      res.status(400).json(err);
    }
  }

async function login(req, res) {
    try {
        // find our user in the database
        const user = await User.findOne({email: req.body.email})
                                .populate('parent')
                                .populate('nanny')
                                .populate('weeklyAvailability')
                                .populate('bookings');
        if (!user) throw new Error(); 
        
        // compare the passwords via bcrypt match()
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) throw new Error(); 
       
        // create the token
        // can use .json to send back a string 
        res.json(userModel.createJWT(user));
    } catch (err) {
        res.status(400).json('Bad Credentials');
    }
};