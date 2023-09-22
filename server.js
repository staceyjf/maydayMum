const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// always require and configure near the top
require('dotenv').config()

//connect to the db
require('./config/database')
   
const app = express();
app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'build')));

// middleware to check and verify a JWT 
// and assign a user object to req.body
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

// we need to put the API routes here before the "catch all" route
// AJAX needs to go to our express server not dev server 
// use use method to mount middleware
app.use('/api/users', require('./routes/api/users'));

const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/accounts', ensureLoggedIn, require('./routes/api/accounts'));
app.use('/api/team', require('./routes/api/team'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});
