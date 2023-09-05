// bringing in the mongoose database via the connect method 
// accessing the database url in our env
// db a shortcut 
// running the on () to connect

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});