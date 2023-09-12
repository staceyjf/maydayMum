const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const bcrypt = require('bcrypt');

module.exports = {
    getAllNannies,
};

// get all nanny profiles
async function getAllNannies(req, res) {
    const nannies = await Nanny.find({}).populate('user');
    console.log('getAllNannies is sending back this', nannies);
    res.json(nannies);
};