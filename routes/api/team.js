const express = require('express');
const router = express.Router();
const teamController = require('../../controllers/api/team');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/team' (defined server.js

// GET /api/team/nannies (get all Nanny accounts)
router.get('/nannies', teamController.getAllNannies);

// POST /api/team/booking (create a booking)
router.get('/booking', teamController.booking);

// POST /api/team/add-nanny (update booking with nanny)
router.post('/add-nanny', teamController.addNanny);

// POST /api/team/updateBooking (update booking with final booking details)
router.post('/updateBooking', ensureLoggedIn, teamController.updateBooking);

module.exports = router;