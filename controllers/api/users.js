const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    getNannyData,
    // getParentData
};

// will pass on a token to the users-api.jsx
async function create(req, res) {
    try {
        // add our user to the db via req.body
        const user = await User.create(req.body);
        // create the token
        const token = createJWT(user);
        // can use .json to send back a string 
        // (method to send a JSON response from a server to a client)
        res.json(token);
    } catch (err) {
        res.status(400).json(err);
    }
};

// create a helper function (aren't exported) to ensure DRY
function createJWT(user) {
    return jwt.sign(// create the token using the jwt's sign()
    // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h'} // token expires in different ways on time. Look at the docs
    ); 
};

// will pass on a token to the users-api.jsx
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

// get Nanny profile with associated user details
async function getNannyData(req, res) {
    const nanny = await Nanny.addNannyToUser(req.user._id).populate('user');
    console.log('Server sending back', nanny);
    res.json(nanny);
};

// // get Parent profile with associated user details
// async function getParentData(req, res) {
//     const parent = await User.findOne(req.user._id);
//     res.json(parent);
//     console.log('Server sending back', parent)
// };

