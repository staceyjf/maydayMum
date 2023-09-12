const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    surname: {type: String, required: true},
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
    parent: {type: Schema.Types.ObjectId, ref: 'Parent'}, // referenced collection 
    nanny: {type: Schema.Types.ObjectId, ref: 'Nanny'} // referenced collection 
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

// using Mongoose middleware - pre-save hook - every time the document is saved, the password would be hashed
userSchema.pre('save', async function(next) {
    // 'this' is the user document. No arrow functions
    // using the isModified() to check if the password has been modified
    if (!this.isModified('password')) return next();
        // Replace the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
    });

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.surname}`
});

// to create the document we need the following args name of model as a string, the schema
module.exports = mongoose.model('User', userSchema);
