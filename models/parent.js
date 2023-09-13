const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Booking = require('./booking');

const parentSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
  numberOfChildren: { type: Number, default: 1,  min: 1 },
  childrenAge: [{ type: Number,  min: 0 }]
}, {
  timestamps: true
});

// add a parent profile to a user's profile or creating it if it doesn't exist (upsert)
parentSchema.statics.addParentToUser = function(userId) {
  return this.findOneAndUpdate(
    { user: userId, }, // query based user id
    { user: userId }, // update if doesn't exist 
    { upsert: true, new: true } // upsert option 
  );
};

module.exports = mongoose.model('Parent', parentSchema);