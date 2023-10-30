const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Parent = require('./parent');
const Nanny = require('./nanny');
const User = require('./user');

const bookingSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, 
    nanny: { type: Schema.Types.ObjectId, ref: 'User' }, // using User as it contains full info for nanny
    Monday: { type: Boolean, default: false }, 
    Tuesday: { type: Boolean, default: false }, 
    Wednesday: { type: Boolean, default: false },
    Thursday: { type: Boolean, default: false },
    Friday: { type: Boolean, default: false },
    Saturday: { type: Boolean, default: false },
    Sunday: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    }, {
    timestamps: true,
    toJSON: { virtuals: true}
});

// creating a orderId 
bookingSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase();
  });

// creating / retrieving a booking doc for a parent
bookingSchema.statics.getBooking = function(userId) {
    return this.findOneAndUpdate(
      { user: userId, isPaid: false },
      { user: userId },
      { upsert: true, new: true }
    );
  };


 
// adds a nanny to a parent booking request  
bookingSchema.methods.addNannyToBooking = async function (nanny) {
    const booking = this; // binds it to the booking doc
    booking.nanny = nanny; // adding the nanny to the bookin
    await booking.save();
    return booking;
  };

module.exports = mongoose.model('Booking', bookingSchema);