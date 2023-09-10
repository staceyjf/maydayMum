const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const nannySchema = new Schema({

});

module.exports = mongoose.model('Nanny', nannySchema);