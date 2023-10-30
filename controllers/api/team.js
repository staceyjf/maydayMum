const userModel = require("../../models/user");
const User = userModel.User; // User alias
const Booking = require("../../models/booking");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const bcrypt = require('bcrypt');
const user = require("../../models/user");
const mongoose = require('mongoose');


module.exports = {
  getAllNannies,
  booking,
  addNanny,
};

// get all nanny profiles
async function getAllNannies(req, res) {
  const nannies = await User.find({ role: 'nanny' })
    .populate('nanny')
    .populate('weeklyAvailability');
  // console.log('getAllNannies is sending back this', nannies);
  res.json(nannies);
}

// create / get booking doc
async function booking(req, res) {
  const newBooking = await Booking.create({});

  console.log('booking is sending back this', newBooking);
  res.json(newBooking);
}

// add selected nanny to parent booking doc
async function addNanny(req, res) {
  const booking = await Booking.getBooking(req.user._id); // get the booking doc 
  // add nanny to the booking
  let updatedBooking = await booking.addNannyToBooking(req.body._id); 

  // Populate 'nanny' first
  await updatedBooking.populate('user nanny');

  // Now that 'nanny' is populated, populate 'nanny.weeklyAvailability'
  await updatedBooking.populate('nanny.weeklyAvailability');


  console.log('addNanny to booking is sending back this', updatedBooking);
  res.json(updatedBooking);
}
