const express = require('express');
const router = express.Router();
const teamController = require('../../controllers/api/team');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/team' (defined server.js

// GET /api/team/nannies (get all Nanny accounts)
router.get('/nannies', teamController.getAllNannies);

// POST /api/team/booking (create a booking)
router.get('/booking', teamController.booking);

// POST /api/team/booking (update booking)
router.get('/nannies', teamController.getAllNannies);

module.exports = router;