const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const Availability = require("../../models/availability");
const bcrypt = require('bcrypt');

module.exports = {
  updateUser,
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