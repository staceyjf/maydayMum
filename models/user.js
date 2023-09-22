const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Parent = require('./parent');
const Nanny = require('./nanny');
const Availability = require('./availability');

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

module.exports = mongoose.model('User', userSchema);
