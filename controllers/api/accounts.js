const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const Availability = require("../../models/availability");
const bcrypt = require('bcrypt');

module.exports = {
  updatedNanny,
  updateNannyAvailability,
  updatedParent
};

async function updatedNanny(req, res) {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id }, 
    { $set: req.body, nanny: req.body.nanny }, // updates User model through Nanny.user
  ).populate('nanny');

  console.log('updatednanny is sending back this', updatedUser);
  res.json(updatedUser);
};

async function updatedParent(req, res) {
  const updatedUser = await Parent.findOneAndUpdate(
    { _id: req.user._id }, 
    { $set: req.body, parent: req.body.parent }, // updates User model through Nanny.user
  ).populate('parent');

  console.log('updatedparent is sending back this', updatedUser);
  res.json(updatedUser);
};


// // update Nanny profile from Account Page
// async function updateNannyProfile(req, res) {
//   // Update the User doc with changes found in the data payload (nanny.user.etc)
//   await User.findOneAndUpdate( // req.user._id comes from our middleware
//     { _id: req.user._id }, // finds the User doc via the the ._id of the user doc
//     { $set: req.body.user }, // updates the user doc with changes found in the data payload (nanny.user.etc)
//   );

//   // Find the nanny doc by its _id provided in the data payload and update it
//   const updatedNanny = await Nanny.findOneAndUpdate(
//     { _id: req.body._id }, // find the nanny doc by it's ._id provided in the data payload
//     { $set: req.body },  // updates the nanny doc with specific fields provided by the data payload
//   ).populate('user');

//   console.log('updateNannyProfile is sending back this', updatedNanny);
//   res.json(updatedNanny);
// }

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

// // get parent profile with associated user details
// async function updateParentProfile(req, res) {
//   await User.findOneAndUpdate(
//     { _id: req.user._id },
//     { $set: req.body.user },
//   );

//   const updatedParent = await Parent.findOneAndUpdate(
//     { _id: req.body._id },
//     { $set: req.body },
//   ).populate('user');

//   console.log('updateParentProfile is sending back this', updatedParent);
//   res.json(updatedParent);
// }
