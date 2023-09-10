const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Nanny = require('./nanny');
const User = require('./user');

const bookingSchema = new Schema({
    parent: {type: Schema.Types.ObjectId, ref: 'User'}, //is this correct ?
    nanny: {type: Schema.Types.ObjectId, ref: 'Nanny'}
    }, {
    timestamps: true,
    
});

module.exports = mongoose.model('Booking', bookingSchema);