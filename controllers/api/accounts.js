const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const bcrypt = require('bcrypt');

module.exports = {
    getNannyData,
    updateParentProfile
};

// get Nanny profile with associated user details
async function getNannyData(req, res) {
    const nanny = await Nanny.addNannyToUser(req.user._id).populate('user');
    console.log('getNannyData is sending back this', nanny);
    res.json(nanny);
};

// get Nanny profile with associated user details
async function updateParentProfile(req, res) {
    const updatedParent = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body }, // Assuming your payload has the updated data for the user profile
    { new: true } // return the updated user document
    );
    console.log('updateParentprofile is sending back this', updatedParent);
    res.json(updatedParent);
};
