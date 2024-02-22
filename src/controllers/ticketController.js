const Ticket = require('../models/ticketModel');


const TicketController = {
  
  generateTicket: async (req, res) => {
    try {
      const { code, purchase_datetime, amount, purchaser } = req.body;
      const newTicket = new Ticket({
        code,
        purchase_datetime,
        amount,
        purchaser
      });
      const savedTicket = await newTicket.save();
      res.status(201).json(savedTicket);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = TicketController;
