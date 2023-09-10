require('dotenv').config();
require('./config/database');

const User = require('./models/user');
const Nanny = require('./models/nanny');
const Booking = require('./models/booking');

// IIFE
// Immediately Invoked Function Expression
(async function() {
  await User.deleteMany({});
  const items = await User.create([
    {firstName: 'Jane', surname: 'Smith', location: '2000', phoneNumber: '048143555', email: 'jane@gmail.com', password: '1234', role: 'parent' },
    {firstName: 'Rich', surname: 'Ford', location: '2000', phoneNumber: '0481434444', email: 'rich@gmail.com', password: '1234', role: 'parent' },
    {firstName: 'Sam', surname: 'Jones', location: '2099', phoneNumber: '048143555', email: 'sam@gmail.com', password: '1234', role: 'nanny' },
    {firstName: 'Sarah', surname: 'Smith', location: '2099', phoneNumber: '048143555', email: 'sarah@gmail.com', password: '1234', role: 'nanny' },    
    {firstName: 'Stacey', surname: 'Smith', location: '2099', phoneNumber: '048143555', email: 'stacey@gmail.com', password: '1234', role: 'nanny', isAdmin: true },
]);

  await Nanny.deleteMany({});
  await Booking.deleteMany({});

  console.log(items)

  process.exit();

})();
