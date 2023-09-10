const Schema = require('mongoose').Schema;

const availabilitySchema = new Schema({
  numberOfChildren: Number,
  childrenAge: [Number]
}, {
  timestamps: true,
  toJSON: { virtuals: true}
});

// Add the following helpful virtuals to order documents
nannySchema.virtual('orderTotal').get(function () {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

module.exports = availabilitySchema;

