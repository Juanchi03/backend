const MessageDao = require('../daos/messageDao');

class MessageController {
  async getAllMessages() {
    try {
      return await MessageDao.getAllMessages();
    } catch (error) {
      throw new Error('Error al obtener todos los mensajes (DB)');
    }
  }

  async addMessage(newMessage) {
    try {
      return await MessageDao.addMessage(newMessage);
    } catch (error) {
      throw new Error('Error al agregar el mensaje (DB)');
    }
  }
}

module.exports = new MessageController();
