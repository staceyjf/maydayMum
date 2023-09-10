const Booking = require('./booking');

const Schema = require('mongoose').Schema;

const parentSchema = new Schema({
  numberOfChildren: { type: Number, default: 1,  min: 0 },
  childrenAge: [{ type: Number,  min: 0 }],
  bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
}, {
  timestamps: true
});

module.exports = parentSchema;