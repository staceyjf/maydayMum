const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const nannySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
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

// nannySchema.statics.initializeNannyProfile = function(userId) {
//   return this.findOneAndUpdate(
//     { user: userId }, // query based user id
//     { user: userId }, // update if doesn't exist 
//     { upsert: true, new: true } // upsert option 
//   );
// };

// nannySchema.statics.initializeNannyProfile = async function(userId) {
//   const nanny = await this.create({ user: userId}); // creating the nanny doc
//   console.log(nanny);
//   return nanny
// };

module.exports = mongoose.model('Nanny', nannySchema);
