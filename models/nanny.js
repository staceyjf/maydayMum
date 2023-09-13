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
      isAvailable: {
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

// seed the initial availability 
const initialAvailabilitySeeding = [
  { day: 'Monday', isAvailable: true },
  { day: 'Tuesday', isAvailable: true },
  { day: 'Wednesday', isAvailable: true },
  { day: 'Thursday', isAvailable: true },
  { day: 'Friday', isAvailable: true },
  { day: 'Saturday', isAvailable: true },
  { day: 'Sunday', isAvailable: true },
];

nannySchema.statics.initializeNannyProfile = function(userId) {
  return this.findOneAndUpdate(
    { user: userId }, // query based user id
    { user: userId, weeklyAvailability: initialAvailabilitySeeding }, // update if doesn't exist 
    { upsert: true, new: true } // upsert option 
  );
};

module.exports = mongoose.model('Nanny', nannySchema);