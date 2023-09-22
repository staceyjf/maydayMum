// bringing in the express module, defining the router with the Router method
// import the userCntrl
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users' 
// POST /api/users/signup 
router.post('/signup', userController.create);
// POST /api/users/login 
router.post('/login', userController.login);

module.exports = router;
// don't forget to mount the router in server.js