// bringing in the express module, defining the router with the Router method
// import the userCntrl
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users' (defined server.js

// POST /api/users (create a user eg a sign up)
router.post('/', userController.create);
router.post('/login', userController.login);
// GET /api/users/account/nanny (get Nanny account)
router.get('/account/nanny', ensureLoggedIn, userController.getNannyData);

module.exports = router;
// don't forget to mount the router in server.js