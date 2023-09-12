const express = require('express');
const router = express.Router();
const teamController = require('../../controllers/api/team');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/team' (defined server.js

// GET /api/team/nannies (get all Nanny accounts)
router.get('/nannies', ensureLoggedIn, teamController.getAllNannies);

module.exports = router;
// don't forget to mount the router in server.js