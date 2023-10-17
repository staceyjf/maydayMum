const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Parent = require('./parent');
const Nanny = require('./nanny');
const Availability = require('./availability');
const Booking = require('./booking');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    surname: {type: String, required: true},
    image: {type: String },
    location: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    email: {
        type: String,
        unique: true, 
        trim: true, 
        lowercase: true, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String, 
        enum: ['parent', 'nanny'],
        required: true
    },
    isAdmin: { type: Boolean, default: false },
    weeklyAvailability: {type: Schema.Types.ObjectId, ref: 'Availability'},
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
    parent: {type: Schema.Types.ObjectId, ref: 'Parent'}, 
    nanny: {type: Schema.Types.ObjectId, ref: 'Nanny'} 
    }, {
    timestamps: true, 
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
}
);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
    });

userSchema.virtual('fullName').get(function() {
    const capitalisedFirstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
    const capitalisedSurname = this.surname.charAt(0).toUpperCase() + this.surname.slice(1);
    return `${capitalisedFirstName} ${capitalisedSurname}`;
});

function createJWT(user) {
    return jwt.sign(// create the token using the jwt's sign()
    // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h'} // token expires in different ways on time. Look at the docs
    ); 
};

// // creating / retrieving a booking doc for a parent
// userSchema.statics.createUser = function() {
//     return 
//   };

// create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    createJWT,
  };