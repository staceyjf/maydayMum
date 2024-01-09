const userModel = require("../../models/user");
const User = userModel.User; // User alias
const Booking = require("../../models/booking");
const Availability = require("../../models/availability");

module.exports = {
  getAllNannies,
  booking,
  addNanny,
  updateBooking
};

// get all nanny profiles
async function getAllNannies(req, res) {
  try {
    // define the page specifics
    // const page = parseInt(req.query.page) || 1; //turn the page query param into a number or defaults to one as a back up
    // const pageSize = 20;

    const nannies = await User.find({ role: 'nanny' })
    // .skip((page - 1) * pageSize) // determines what subset of data needs to be returned
    // .limit(pageSize) //determine the number of results retrieved by page
    .populate('nanny')
    .populate('weeklyAvailability');
  // console.log('getAllNannies is sending back this', nannies);
  res.json(nannies);
  } catch (error) {
    console.error("Error fetching nannies", error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// create / get booking doc
async function booking(req, res) {
  try {
    const booking = await Booking.getBooking(req.user._id); // get the booking doc 

    console.log('booking is sending back this', booking);
    res.json(booking);
  } catch (error) {
    console.error("Error getting booking", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// add selected nanny to parent booking doc
async function addNanny(req, res) {
  try {
    const booking = await Booking.getBooking(req.user._id); // get the booking doc 
    // add nanny to the booking
    let updatedBooking = await booking.addNannyToBooking(req.body._id)
    
    await updatedBooking.populate('user nanny') // Populate 'nanny' first
  
    // Now that 'nanny' is populated, populate 'nanny.weeklyAvailability'
    await updatedBooking.populate('nanny.weeklyAvailability');
  
    console.log('addNanny to booking is sending back this', updatedBooking);
    res.json(updatedBooking);
  } catch (error) {
    console.error("Error getting addNanny", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// finalise the booking
async function updateBooking(req, res) {

  console.log('req.user before update:', req.user);

  try {
    // add booking doc to the bookings array in User Model
    await User.findOneAndUpdate(
      { _id: req.user._id }, 
      {
        $push: { bookings: req.body._id }, // Add booking ID to the bookings array
      },
      {returnDocument: 'after'}
    )

    // find the days truthy days from our bookingData object and produce an object containing the days to update 
    const selectedDays = Object.keys(req.body).reduce((acc, key) => {
      if (key.includes('day') && req.body[key]) { // filter out the non-day keys and look for truthy values for the days that are booked
        acc[key] = false; // changing it to falsy so it removes that day out of availability with 
      }
      return acc;
    }, {})

    // Update Nanny's availability to ensure she can't be double booked 
    await Availability.findOneAndUpdate(
      { _id: req.body.nanny.weeklyAvailability._id }, 
      { $set: selectedDays }, // updates the fields based on the selectedDay Object 
      {returnDocument: 'after'}
    )
    
    // update the booking model
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: req.body._id }, 
      { 
        $set: {
          ...req.body,        //  update other relevant fields
          isPaid: true        // change to pay
        }
      },
      { returnDocument: 'after' }
    ).populate('user nanny');

    // Now that 'user' is populated, populate 'user.bookings'
    await updatedBooking.populate('user.bookings user.parent');

    // Now that 'user.bookings' is populated, populate 'user.bookings.nanny'
    await updatedBooking.populate('user.bookings.nanny');

    // Now that 'nanny' is populated, populate 'nanny.weeklyAvailability'
    await updatedBooking.populate('nanny.weeklyAvailability');
  
    // Save the updated booking with modified nanny availability
    await updatedBooking.save();

    console.log('updatedBooking to booking is sending back this', updatedBooking);
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}