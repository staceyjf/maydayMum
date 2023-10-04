const User = require("../../models/user");
const Booking = require("../../models/booking");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const bcrypt = require('bcrypt');
const user = require("../../models/user");

module.exports = {
  getAllNannies,
  booking,
};

// get all nanny profiles
async function getAllNannies(req, res) {
  const nannies = await User.find({ role: 'nanny' })
    .populate('nanny')
    .populate('weeklyAvailability');
//   console.log('getAllNannies is sending back this', nannies);
  res.json(nannies);
}

async function booking(req, res) {
  const booking = await Booking.getBooking(req.user._id);
  console.log('booking is sending back this', booking);
  res.json(booking);
}
