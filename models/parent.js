const Schema = require('mongoose').Schema;
const Booking = require('./booking');

const parentSchema = new Schema({
  numberOfChildren: { type: Number, default: 1,  min: 0 },
  childrenAge: [{ type: Number,  min: 0 }],
  bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
}, {
  timestamps: true
});

// add a parent profile to a user's profile or creating it if it doesn't exist (upsert)
parentSchema.statics.addParentToUser = function(userId) {
  return this.findOneAndUpdate(
    { user: userId }, // query
    { user: userId }, // update iif doesn't exist 
    { upsert: true, new: true } // upsert option 
  );
};

module.exports = parentSchema;