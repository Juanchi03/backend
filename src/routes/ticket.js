const express = require('express');
const router = express.Router();
const passport = require('passport');
const ticketController = require('../controllers/ticketController');
const { isUser } = require('../middlewares/authorizationMiddleware'); 

router.get('/', passport.authenticate('jwt', { session: false }), isUser, ticketController.getAllTickets);
router.post('/', passport.authenticate('jwt', { session: false }), isUser, ticketController.createTicket);

module.exports = router;

