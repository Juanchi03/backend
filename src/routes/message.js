const express = require('express');
const router = express.Router();
const MessageManager = require('../managers/messageManager');

router.get('/', async (req, res) => {
  try {
    const messages = await MessageManager.getAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

router.post('/', async (req, res) => {
  const newMessage = req.body; 
  try {
    const createdMessage = await MessageManager.addMessage(newMessage);
    res.status(201).json(createdMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el mensaje' });
  }
});

module.exports = router;
