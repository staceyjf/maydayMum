const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const availabilitySchema = require('./availability');
const Booking = require('./booking');

const nannySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    availability: [availabilitySchema],
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
    image: {
        type: String,
        get: v => `${root}${v}`
      },
    aboutDescription: String,
    nightRate: { type: Number, default: 300,  min: 0 },
    isWccCleared: { type: Boolean, default: false },
    isFirstAidCertified: { type: Boolean, default: false },
    }, {
    timestamps: true,
    
});

// //Need to review how to do aws for images
// //Image getter
const bucket = process.env.S3_BUCKET;
const root = `${process.env.S3_BASE_URL}/${bucket}`;
// const doc = new User({ name: 'Val', picture: '/123.png' }); // should this not be Nanny.findbyId
// const nanny = 
// doc.image; 
// doc.toObject({ getters: false }).image; // '/123.png'

module.exports = mongoose.model('Nanny', nannySchema);