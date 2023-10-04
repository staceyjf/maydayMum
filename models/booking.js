const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Parent = require('./parent');
const Nanny = require('./nanny');

const bookingSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}, 
    nanny: {type: Schema.Types.ObjectId, ref: 'Nanny'},
    Monday: { type: Boolean, default: false }, 
    Tuesday: { type: Boolean, default: false }, 
    Wednesday: { type: Boolean, default: false },
    Thursday: { type: Boolean, default: false },
    Friday: { type: Boolean, default: false },
    Saturday: { type: Boolean, default: false },
    Sunday: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    }, {
    timestamps: true,
    toJSON: { virtuals: true}
});

// creating a orderId 
bookingSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase();
  });

// creating a booking doc 
bookingSchema.statics.getBooking = function(userId) {
    return this.findOneAndUpdate(
      { user: userId, isPaid: false },
      { user: userId },
      { upsert: true, new: true }
    );
  };
  
// orderSchema.methods.addItemToCart = async function (itemId) {
//     const cart = this;
//     // Check if the item already exists in the cart
//     // mongoose equals() allows us to compare ._id object to a string (itemId) 
//     const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
//     if (lineItem) {
//       // It already exists, so increase the qty
//       lineItem.qty += 1;
//     } else {
//       // Get the item from the "catalog"
//       // Note how the mongoose.model method behaves as a getter when passed one arg vs. two 
//       // (eg like requiring it above but avoiding a potential circualr reference)
//       const Item = mongoose.model('Item');
//       const item = await Item.findById(itemId);
//       // The qty of the new lineItem object being pushed in defaults to 1 (defined above in the model)
//       // represents .push({ qty: 1, item: item})
//       cart.lineItems.push({ item });
//     }
//     // return the save() method's promise
//     // this allows us to call the await on addItemToCard
//     return cart.save();
//   };

module.exports = mongoose.model('Booking', bookingSchema);