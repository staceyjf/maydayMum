const jwt = require("jsonwebtoken");
const User = require("../../models/user");
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
        const user = await User.create(req.body); // create the user

        // if nanny
        if (user.role === 'nanny') {
            const nannyProfile = await Nanny.create({ user: user._id }); // create nanny profile
            const availability = await Availability.create({ user: user._id }); // create availability
            const fullUserProfile = await User.findOneAndUpdate( //update user
            { _id: user._id }, 
            { nanny: nannyProfile._id, weeklyAvailability: availability._id }, 
            {returnDocument: 'after'}
            ).populate('nanny').populate('weeklyAvailability');
        const token = createJWT(fullUserProfile); // send back complete user
        console.log('this is the updated user with nanny & weekly avalis', fullUserProfile);
        res.json(token);

        // if parent
        } else if (user.role === 'parent') { 
            const parentProfile = await Parent.create({ user: user._id });
            const fullUserProfile = await User.findOneAndUpdate(
            { _id: user._id }, 
            { parent: parentProfile._id }, 
            {returnDocument: 'after'}
            ).populate('parent');
            const token = createJWT(fullUserProfile);
            console.log('this is the updated user with parent', fullUserProfile);
            res.json(token);
        };
    } catch (err) {
        res.status(400).json(err);
    }
};

function createJWT(user) {
    return jwt.sign(// create the token using the jwt's sign()
    // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h'} // token expires in different ways on time. Look at the docs
    ); 
};

async function login(req, res) {
    try {
        // find our user in the database
        const user = await User.findOne({email: req.body.email});
        if (!user) throw new Error(); 
        
        // compare the passwords via bcrypt match()
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) throw new Error(); 
       
        // create the token
        // can use .json to send back a string 
        res.json(createJWT(user));
    } catch (err) {
        res.status(400).json('Bad Credentials');
    }
};