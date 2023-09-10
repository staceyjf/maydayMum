const Schema = require('mongoose').Schema;

const parentSchema = new Schema({
  numberOfChildren: Number,
  childrenAge: [Number]
}, {
  timestamps: true
});

module.exports = parentSchema;