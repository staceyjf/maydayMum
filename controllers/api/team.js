const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const bcrypt = require('bcrypt');
const user = require("../../models/user");

module.exports = {
    getAllNannies,
};

// // get all nanny profiles
// async function getAllNannies(req, res) {
//     const nannies = await User.find({}).populate('user'); 
//     // using exec() to ensure each user is associated to their nanny profile 
//     console.log('getAllNannies is sending back this', nannies);
//     res.json(nannies);
// };

// get all nanny profiles
async function getAllNannies(req, res) {
    const nannies = await User.find({ role: 'nanny'}).populate('nanny').populate('weeklyAvailability');
    console.log('getAllNannies is sending back this', nannies);
    res.json(nannies);
};
