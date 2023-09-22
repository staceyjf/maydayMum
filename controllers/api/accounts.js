const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const Availability = require("../../models/availability");
const bcrypt = require('bcrypt');

module.exports = {
  updateUser,
  getNannyData,
  getNannyAvailability,
  getParentData,
  updateNannyProfile,
  updateNannyAvailability,
  updateParentProfile
};

async function updateUser(req, res) {
  //
  await Parent.findOneAndUpdate(
    { user: req.user._id }, 
    { $set: req.body.parent },
    {returnDocument: 'after'}
  )

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    {returnDocument: 'after'}
  ).populate('parent')
  .populate('nanny')
  .populate('weeklyAvailability');

  console.log('updateUser is sending back this', updatedUser);
  res.json(updatedUser);
}

// get Nanny profile with associated user details
async function getNannyData(req, res) { 
  const nannyWithUser = await Nanny.findOne({ user: req.user._id }).populate('user');
  console.log('getNannyData is sending back this', nannyWithUser);
  res.json(nannyWithUser);
}
// get the logged-in nannies' availability
async function getNannyAvailability(req, res) {
  const availabilityToUser = await Availability.findOne({ user: req.user._id }).populate('user');
  console.log('getNannyAvailability is sending back this', availabilityToUser);
  res.json(availabilityToUser);
}

// get Parent profile with associated user details
async function getParentData(req, res) {
  const nannyWithParent = await Parent.findOne({ user: req.user._id }).populate('user');
  // console.log('getParentData is sending back this', nannyWithParent);
  res.json(nannyWithParent);
}

// update Nanny profile from Account Page
async function updateNannyProfile(req, res) {
  // Update the User doc with changes found in the data payload (nanny.user.etc)
  await User.findOneAndUpdate( // req.user._id comes from our middleware
    { _id: req.user._id }, // finds the User doc via the the ._id of the user doc
    { $set: req.body.user }, // updates the user doc with changes found in the data payload (nanny.user.etc)
    {returnDocument: 'after'} 
  );

  // Find the nanny doc by its _id provided in the data payload and update it
  const updatedNanny = await Nanny.findOneAndUpdate(
    { _id: req.body._id }, // find the nanny doc by it's ._id provided in the data payload
    { $set: req.body },  // updates the nanny doc with specific fields provided by the data payload
    {returnDocument: 'after'}
  ).populate('user');

  console.log('updateNannyProfile is sending back this', updatedNanny);
  res.json(updatedNanny);
}

// update availability from Account Page
async function updateNannyAvailability(req, res) {
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body.user },
    {returnDocument: 'after'}
  );

  const updatedAvailability = await Availability.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    {returnDocument: 'after'}
  ).populate('user');

  console.log('updateNannyAvailability is sending back this', updatedAvailability);
  res.json(updatedAvailability);
}

// get parent profile with associated user details
async function updateParentProfile(req, res) {
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body.user },
    {returnDocument: 'after'}
  );

  const updatedParent = await Parent.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    {returnDocument: 'after'}
  ).populate('user');

  console.log('updateParentProfile is sending back this', updatedParent);
  res.json(updatedParent);
}
