// bringing in the express module, defining the router with the Router method
// import the userCntrl
const express = require('express');
const router = express.Router();
const accountsController = require('../../controllers/api/accounts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/accounts' (defined server.js

router.post('/nanny-profile', ensureLoggedIn, accountsController.updatedNanny);
// POST /api/accounts/nanny-profile (update nanny profile)
router.post('/nanny-availability', ensureLoggedIn, accountsController.updateNannyAvailability);
// POST /api/accounts/parent-profile (update parent profile)
router.post('/parent-profile', ensureLoggedIn, accountsController.updatedParent);

module.exports = router;
// don't forget to mount the router in server.js