const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    Monday: { type: Boolean, default: true }, 
    Tuesday: { type: Boolean, default: true }, 
    Wednesday: { type: Boolean, default: true },
    Thursday: { type: Boolean, default: true },
    Friday: { type: Boolean, default: true },
    Saturday: { type: Boolean, default: true },
    Sunday: { type: Boolean, default: true }
});

// availabilitySchema.statics.initializeAvailability = function(userId) {
//     return this.findOneAndUpdate(
//       { user: userId }, // query based user id
//       { user: userId }, // update if doesn't exist 
//       { upsert: true, new: true } // upsert option 
//     );
//   };

module.exports = mongoose.model('Availability', availabilitySchema);