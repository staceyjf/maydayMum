const User = require("../../models/user");
const Nanny = require("../../models/nanny");
const Parent = require("../../models/parent");
const Availability = require("../../models/availability");
const jwt = require("jsonwebtoken");

module.exports = {
  updateUser
};

function createJWT(user) {
  return jwt.sign(// create the token using the jwt's sign()
      { user },
      process.env.SECRET,
      { expiresIn: '24h'} // setting token expiration 
  ); 
};

// update 'user' post account profile changes
async function updateUser(req, res) {
  // for a parent account
  if (req.body.role === 'parent') {
    await Parent.findOneAndUpdate(
      { user: req.user._id }, 
      { $set: req.body.parent },
      {returnDocument: 'after'}
    )
  } else {
    // for a nanny account
    await Nanny.findOneAndUpdate(
      { user: req.user._id }, 
      { $set: req.body.nanny },
      {returnDocument: 'after'}
    )
    // update their avails
    await Availability.findOneAndUpdate(
      { user: req.user._id }, 
      { $set: req.body.weeklyAvailability },
      {returnDocument: 'after'}
    )
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    {returnDocument: 'after'}
  ).populate('parent')
  .populate('nanny')
  .populate('weeklyAvailability');

  const token = createJWT(updatedUser); // send back complete user

  console.log('updateUser is sending back this', updatedUser);
  res.json(token);
}
