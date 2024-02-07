const Message = require('../models/messageModel');

class MessageDao {
  async getAllMessages() {
    try {
      return await Message.find();
    } catch (error) {
      throw new Error('Error al obtener todos los mensajes');
    }
  }

  async addMessage(newMessage) {
    try {
      return await Message.create(newMessage);
    } catch (error) {
      throw new Error('Error al agregar el mensaje');
    }
  }
}

module.exports = new MessageDao();

