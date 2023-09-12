// bringing in the express module, defining the router with the Router method
// import the userCntrl
const express = require('express');
const router = express.Router();
const accountsController = require('../../controllers/api/accounts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/accounts' (defined server.js

// GET /api/accounts/nanny (get Nanny account)
router.get('/nanny', ensureLoggedIn, accountsController.getNannyData);
// // GET /api/accounts/nannies (get all Nanny accounts)
// router.get('/nannies', ensureLoggedIn, accountsController.getAllNannies);
// GET /api/accounts/parent (get parent account)
router.get('/parent', ensureLoggedIn, accountsController.getParentData);
// POST /api/accounts/nanny-profile (update nanny profile)
router.post('/nanny-profile', ensureLoggedIn, accountsController.updateNannyProfile);
// POST /api/accounts/parent-profile (update parent profile)
router.post('/parent-profile', ensureLoggedIn, accountsController.updateParentProfile);

module.exports = router;
// don't forget to mount the router in server.js