const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Booking = require('./booking');

const parentSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  numberOfChildren: { type: Number, default: 1,  min: 1 },
  childrenAge: [{ type: Number,  min: 0 }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Parent', parentSchema);