const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Parent = require('./parent');
const Nanny = require('./nanny');

const bookingSchema = new Schema({
    parent: {type: Schema.Types.ObjectId, ref: 'User'}, 
    nanny: {type: Schema.Types.ObjectId, ref: 'Nanny'}
    }, {
    timestamps: true,
    
});

module.exports = mongoose.model('Booking', bookingSchema);