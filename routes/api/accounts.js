// bringing in the express module, defining the router with the Router method
// import the userCntrl
const express = require('express');
const router = express.Router();
const accountsController = require('../../controllers/api/accounts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/accounts' (defined server.js

// POST /api/accounts/update (update  profile)
router.post('/update', ensureLoggedIn, accountsController.updateUser);

module.exports = router;