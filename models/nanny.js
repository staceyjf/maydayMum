const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const parentSchema = require('./parent');

const nannySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    availability: [availabilitySchema],
    image: {
        type: String,
        get: v => `${root}${v}`
      },
    aboutDescription: String,
    nightRate: Number,
    isWwccCleared: Boolean,
    isFirstAidCertified: Boolean,
    }, {
    timestamps: true,
    
});

// //Need to review how to do aws for images
// //Image getter
const root = 'https://s3.amazonaws.com/mybucket';
const doc = new User({ name: 'Val', picture: '/123.png' });
doc.image; // 'https://s3.amazonaws.com/mybucket/123.png'
doc.toObject({ getters: false }).image; // '/123.png'

module.exports = mongoose.model('Nanny', nannySchema);