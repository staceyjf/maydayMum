const Schema = require('mongoose').Schema;

const availabilitySchema = new Schema({
  availability: {
    type: String, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
},
}, {
  timestamps: true,
  toJSON: { virtuals: true}
});

// // Add the following helpful virtuals to order documents
// nannySchema.virtual('orderTotal').get(function () {
//   return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
// });

module.exports = availabilitySchema;