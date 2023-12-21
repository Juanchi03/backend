import { find, create } from './models/messageModel';

class MessageDao {
  async getAllMessages() {
    try {
      return await find();
    } catch (error) {
      throw new Error('Error al obtener todos los mensajes');
    }
  }

  async addMessage(newMessage) {
    try {
      return await create(newMessage);
    } catch (error) {
      throw new Error('Error al agregar el mensaje');
    }
  }
}

export default new MessageDao();
