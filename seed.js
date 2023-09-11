require('dotenv').config();
require('./config/database');

const User = require('./models/user');
const Nanny = require('./models/nanny');
const Booking = require('./models/booking');

// IIFE
// Immediately Invoked Function Expression
(async function() {
  await User.deleteMany({});
  await Nanny.deleteMany({});
  await Booking.deleteMany({});

  const parent1 = await User.create({
    firstName: 'Jane', 
    surname: 'Smith', 
    location: '2000', 
    phoneNumber: '048143555', 
    email: 'jane@gmail.com', 
    password: '1234', 
    role: 'parent',
    isAdmin: false,
    parent: {
      numberOfChildren: 2,
      childrenAge: [ 1 , 1 ],
      bookings: []
    },
  });
  
  const admin = await User.create({
    firstName: 'Stacey', 
    surname: 'Smith', 
    location: '2095', 
    phoneNumber: '048143511', 
    email: 'stacey@gmail.com', 
    password: '1234', 
    role: 'parent',
    isAdmin: true,
  });
 
  const nannyUser1 = await User.create({
    firstName: 'Sam', 
    surname: 'Jones', 
    location: '2099', 
    phoneNumber: '048143545', 
    email: 'sam@gmail.com', 
    password: '1234', 
    role: 'nanny',
    isAdmin: false, 
  });

  const nanny1 = await Nanny.create({
    aboutDescription: "I love being a nanny and can't wait to prove you with extra support so you can feel secure in knowing your children are well looked after",
    nightRate: 250,
    isWccCleared: true,
    isFirstAidCertified: true,
  });

  nannyUser1.nanny = nanny1._id;
  await nannyUser1.save();

  const nannyUser2 = await User.create({
    firstName: 'Cindy', 
    surname: 'Jones', 
    location: '2095', 
    phoneNumber: '048143222', 
    email: 'cindy@gmail.com', 
    password: '1234', 
    role: 'nanny',
    isAdmin: false, 
  });

  const nanny2 = await Nanny.create({
    aboutDescription: "I am a fun loving nanny with 1000 hours of experience",
  });

  nannyUser2.nanny = nanny2._id;
  await nannyUser2.save();
  
  console.log(parent1, nannyUser1, nannyUser2, admin)

  process.exit();

})();
