const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const Availability = require("../../models/availability");
const bcrypt = require('bcrypt');

module.exports = {
  updateUser,
  getNannyAvailability,
  updateNannyAvailability,
};

// update user post interaction
async function updateUser(req, res) {
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

// get the logged-in nannies' availability
async function getNannyAvailability(req, res) {
  const availabilityToUser = await Availability.findOne({ user: req.user._id }).populate('user');
  console.log('getNannyAvailability is sending back this', availabilityToUser);
  res.json(availabilityToUser);
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
