const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

// keep this lean and always add properties on the related document eg user posts
const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        unique: true, //ensure that its a unique email
        trim: true, // remove any whitespace
        lowercase: true, // ensures that an email with a C and a c will match 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
}, {
    timestamps: true, // allows you to know when the user signed up
    toJSON: { // transform the document when its serialized to JSON 
        // automatically delete elements from a document
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
}
);

// using Mongoose middleware - pre-save hook - every time the document is saved, the password would be hashed
// next is our await for mongoose
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
