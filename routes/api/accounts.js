// bringing in the express module, defining the router with the Router method
// import the userCntrl
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/accounts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/accounts' (defined server.js

// GET /api/accounts/nanny (get Nanny account)
router.get('/nanny', ensureLoggedIn, userController.getNannyData);
// POST /api/accounts/nanny-profile (update nanny profile)
router.post('/nanny-profile', ensureLoggedIn, userController.updateNannyProfile);
// POST /api/accounts/parent-profile (update parent profile)
router.post('/parent-profile', ensureLoggedIn, userController.updateParentProfile);

module.exports = router;
// don't forget to mount the router in server.js