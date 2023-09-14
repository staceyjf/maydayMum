const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const nannySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
    aboutDescription: { type: String, default: '' },
    nightRate: { type: Number, default: 300,  min: 0 },
    isWccCleared: { type: Boolean, default: false },
    isFirstAidCertified: { type: Boolean, default: false },
    }, {
    timestamps: true,
});

module.exports = mongoose.model('Nanny', nannySchema);
