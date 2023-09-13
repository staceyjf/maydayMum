const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Booking = require('./booking');
const availabilitySchema = require('./availability');

const nannySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
    availability: availabilitySchema,
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

// add a nanny profile to a user's profile or creating it if it doesn't exist (upsert)
nannySchema.statics.addNannyToUser = function(userId) {
  return this.findOneAndUpdate(
    { user: userId }, // query based user id
    { user: userId }, // update if doesn't exist 
    { upsert: true, new: true } // upsert option 
  );
};

module.exports = mongoose.model('Nanny', nannySchema);