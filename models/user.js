const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const parentSchema = require('./parent');
const Nanny = require('./nanny');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    surname: {type: String, required: true},
    location: String,
    phoneNumber: String,
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
    parents: [parentSchema], // embedded sub-documents 
    nannies: [{type: Schema.Types.ObjectId, ref: 'Nanny'}] // referenced collection 
    }, {
    timestamps: true, 
    toJSON: { 
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

// to create the document we need the following args name of model as a string, the schema
module.exports = mongoose.model('User', userSchema);
