const Schema = require('mongoose').Schema;

const availabilitySchema = new Schema({
  weeklyAvailability: [{
    type: String, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
}],
}, {
  timestamps: true,
  toJSON: { virtuals: true}
});

module.exports = availabilitySchema;