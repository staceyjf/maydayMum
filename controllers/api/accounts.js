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
      { expiresIn: '24h'} // token expires in different ways on time. Look at the docs
  ); 
};

// update user post interaction
async function updateUser(req, res) {

  if (req.body.role === 'parent') {
    await Parent.findOneAndUpdate(
      { user: req.user._id }, 
      { $set: req.body.parent },
      {returnDocument: 'after'}
    )
  } else {
    await Nanny.findOneAndUpdate(
      { user: req.user._id }, 
      { $set: req.body.nanny },
      {returnDocument: 'after'}
    )

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
