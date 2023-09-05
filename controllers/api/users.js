const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken
};

// will pass on a token to the users-api.jsx
async function create(req, res) {
    // // baby step response is going to send back the user object (re.json) which contains an object of our 3 properties
    // // res.json is a promise
    // res.json({
    //     user: {
    //         name: req.body.name,
    //         email: req.body.email
    //     }
    // });
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
        // send the error message to the server so other devs can see the error message in the network tab
    }

}

// create a helper function (aren't exported) to ensure DRY
function createJWT(user) {
    return jwt.sign(// create the token using the jwt's sign()
    // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h'} // token expires in different ways on time. Look at the docs
    ); 
}

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

}

function checkToken(req, res) {
    console.log('req.user', req.user); // making sure we see our user info in terminal
    res.json(req.exp);
}
