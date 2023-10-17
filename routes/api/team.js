const express = require('express');
const router = express.Router();
const teamController = require('../../controllers/api/team');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/team' (defined server.js

// GET /api/team/nannies (get all Nanny accounts)
router.get('/nannies', teamController.getAllNannies);

// POST /api/team/booking (create a booking)
router.get('/booking', teamController.booking);

// POST /api/team/add-nanny (update booking)
router.post('/add-nanny', teamController.addNanny);

module.exports = router;