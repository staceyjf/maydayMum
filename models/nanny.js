const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Booking = require('./booking');

const nannySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
    weeklyAvailability: [{ // array of weekly availability objects
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true,
      },
      available: {
        type: Boolean,
        default: true, 
      },
    }],
    image: {
        type: String,
        get: v => `${root}${v}`
      },
    aboutDescription: { type: String, default: '' },
    nightRate: { type: Number, default: 300,  min: 0 },
    isWccCleared: { type: Boolean, default: false },
    isFirstAidCertified: { type: Boolean, default: false },
    }, {
    timestamps: true,
});

// add a user profile to a nanny's profile or creating it if it doesn't exist (upsert)
nannySchema.statics.addUserToNanny = function(userId) {
  return this.findOneAndUpdate(
    { user: userId }, // query based user id
    { user: userId }, // update if doesn't exist 
    { upsert: true, new: true } // upsert option 
  );
};

module.exports = mongoose.model('Nanny', nannySchema);