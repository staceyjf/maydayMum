require('dotenv').config();
require('./config/database');

const userModel = require("./models/user");
const User = userModel.User; // User alias
const Nanny = require('./models/nanny');
const Booking = require('./models/booking');
const Availability = require("./models/availability");
const crypto = require('crypto');

// IIFE
// Immediately Invoked Function Expression
(async function () {
  // Delete existing data if needed
  await User.deleteMany({});
  await Nanny.deleteMany({});
  await Booking.deleteMany({});
  await Availability.deleteMany({});

// Function to generate a secure random phone number
const generateSecureRandomPhoneNumber = () => {
  const randomBuffer = crypto.randomBytes(4); // 
  const randomNumber = parseInt(randomBuffer.toString('hex'), 16);
  const paddedNumber = randomNumber.toString().padStart(10, '0');
  return `04814${paddedNumber}`;
};

// Function to generate a secure random boolean
const getSecureRandomBoolean = () => {
  const randomBit = crypto.randomInt(2); // 0 or 1
  return Boolean(randomBit);
};

  // Unique values for names, surnames, and about descriptions
  const uniqueNames = ['Alice', 'Bob', 'Cindy', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
  const uniqueSurnames = ['Smith', 'Johnson', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
  const uniqueAboutDescriptions = [
    "Experienced nanny with a passion for childcare.",
    "Fun and loving nanny dedicated to creating a safe environment.",
    "Skilled in engaging children in educational activities.",
    "Enthusiastic and energetic nanny committed to child development.",
    "Patient and caring nanny with excellent communication skills.",
    "Passionate about fostering a positive and nurturing atmosphere.",
    "Creative and resourceful nanny with a love for arts and crafts.",
    "Detail-oriented nanny focused on meeting the unique needs of each child.",
    "Friendly and responsible nanny with a strong sense of responsibility.",
    "Adaptable and reliable nanny with a warm and friendly personality.",
  ];

  // Create 10 nanny users
  const nannyUsers = [];
  for (let i = 0; i < 10; i++) {
    const name = uniqueNames[i % uniqueNames.length];
    const surname = uniqueSurnames[i % uniqueSurnames.length];
    const aboutDescription = uniqueAboutDescriptions[i % uniqueAboutDescriptions.length];

    const nannyUser = await User.create({
      firstName: name,
      surname: surname,
      location: '2099',
      phoneNumber: generateSecureRandomPhoneNumber(),
      email: `${name.toLowerCase()}${surname.toLowerCase()}@gmail.com`,
      password: '1234',
      role: 'nanny',
      isAdmin: false,
    });

    const nanny = await Nanny.create({
      aboutDescription: aboutDescription,
      nightRate: 250 + i * 10, // Adjust nightRate based on the iteration
      isWccCleared: getSecureRandomBoolean(), // Alternate between true and false
      isFirstAidCertified: getSecureRandomBoolean(), // Alternate between true and false
    });

    const avalis = await Availability.create({
      Monday: getSecureRandomBoolean(), // Alternate between true and false, 
      Tuesday: getSecureRandomBoolean(), // Alternate between true and false, 
      Wednesday: getSecureRandomBoolean(), // Alternate between true and false,
      Thursday: getSecureRandomBoolean(), // Alternate between true and false,
      Friday: getSecureRandomBoolean(), // Alternate between true and false,
      Saturday: getSecureRandomBoolean(), // Alternate between true and false,
      Sunday: getSecureRandomBoolean(), // Alternate between true and false
    });

    nannyUser.nanny = nanny._id;
    nannyUser.weeklyAvailability = avalis._id;
    await nannyUser.save();

    nannyUsers.push(nannyUser);
  }

  console.log(nannyUsers);

  process.exit();
})();
