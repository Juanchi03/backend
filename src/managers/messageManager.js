const fs = require('fs/promises');
const path = require('path');

const MESSAGES_FILE_PATH = path.join(__dirname, '../../../messages.json');

class MessageManagerFileSystem {
  async getAllMessages() {
    try {
      const data = await fs.readFile(MESSAGES_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
     
      return [];
    }
  }

  async addMessage(newMessage) {
    try {
      let messages = await this.getAllMessages();
      messages.push(newMessage);
      await fs.writeFile(MESSAGES_FILE_PATH, JSON.stringify(messages, null, 2));
      return newMessage;
    } catch (error) {
      throw new Error('Error al agregar el mensaje (FileSystem)');
    }
  }
}

module.exports = new MessageManagerFileSystem();

