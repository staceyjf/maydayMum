const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const bcrypt = require('bcrypt');

module.exports = {
    getNannyData,
    updateParentProfile,
    updateNannyProfile
};

// get Nanny profile with associated user details
async function getNannyData(req, res) {
    const nanny = await Nanny.addNannyToUser(req.user._id).populate('user');
    console.log('getNannyData is sending back this', nanny);
    res.json(nanny);
};

// update Nanny profile from Account Page
async function updateNannyProfile(req, res) {
    console.log(req.body, req.user._id, req._id)
    const updatedNanny = await Nanny.findOneAndUpdate(
    { _id: req.body._id},
    { $set: req.body },
    { new: true } // return the updated nanny document
    );

    await User.findOneAndUpdate( //updated the user document
        { _id: req.user._id }, 
        { $set: req.body.user }, // do i need to access the user related info like this?
        { new: true }
    );

    console.log('updateNannyProfile is sending back this', updatedNanny);
    res.json(updatedNanny);
};

// get parent profile with associated user details
async function updateParentProfile(req, res) {
    const updatedParent = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body }, // Assuming your payload has the updated data for the user profile
    { new: true } // return the updated user document
    );
    console.log('updateParentprofile is sending back this', updatedParent);
    res.json(updatedParent);
};
