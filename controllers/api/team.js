const User = require("../../models/user");
const Booking = require("../../models/booking");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const bcrypt = require('bcrypt');
const user = require("../../models/user");

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
  console.log('getAllNannies is sending back this', nannies);
  res.json(nannies);
}

// create / get booking doc
async function booking(req, res) {
  const booking = await Booking.getBooking(req.user._id);
  console.log('booking is sending back this', booking);
  res.json(booking);
}

// add selected nanny to parent booking doc
async function addNanny(req, res) {
  console.log('req.body._id:', req.body._id, 'req.user._id:', req.user._id)
  const booking = await Booking.getBooking(req.user._id);
  console.log(booking);
  const updatedBooking = await booking.addNannyToBooking(req.body._id, req.user._id);
  const populatedBooking = await Booking.findById(updatedBooking._id)
    .populate('nanny')
    .populate('user');
  console.log('addNanny to booking is sending back this', populatedBooking);
  res.json(populatedBooking);
}
