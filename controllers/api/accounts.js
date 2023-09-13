const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const Availability = require("../../models/availability");
const bcrypt = require('bcrypt');

module.exports = {
  getNannyData,
  getNannyAvailability,
  getParentData,
  updateNannyProfile,
  updateNannyAvailability,
  updateParentProfile
};

// get Nanny profile with associated user details
async function getNannyData(req, res) {
  const nanny = await Nanny.initializeNannyProfile(req.user._id).populate('user');
  console.log('getNannyData is sending back this', nanny);
  res.json(nanny);
}

// get the logged-in nannies' availability
async function getNannyAvailability(req, res) {
  const availability = await Availability.initializeAvailability(req.user._id);
  const availabilityToUser = await availability.populate('user');

  console.log('getNannyAvailability is sending back this', availabilityToUser);
  res.json(availabilityToUser);
}

// get Parent profile with associated user details
async function getParentData(req, res) {
  const parent = await Parent.addParentToUser(req.user._id).populate('user');
  console.log('getParentData is sending back this', parent);
  res.json(parent);
}

// update Nanny profile from Account Page
async function updateNannyProfile(req, res) {
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body.user },
  );

  const updatedNanny = await Nanny.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body }, 
  ).populate('user');

  console.log('updateNannyProfile is sending back this', updatedNanny);
  res.json(updatedNanny);
}

// update availability from Account Page
async function updateNannyAvailability(req, res) {
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body.user },
  );

  const updatedAvailability = await Availability.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
  ).populate('user');

  console.log('updateNannyAvailability is sending back this', updatedAvailability);
  res.json(updatedAvailability);
}

// get parent profile with associated user details
async function updateParentProfile(req, res) {
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body.user },
  );

  const updatedParent = await Parent.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
  ).populate('user');

  console.log('updateParentProfile is sending back this', updatedParent);
  res.json(updatedParent);
}
