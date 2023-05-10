import Chats from "../models/Chats.js";
import Chat from "../models/Chats.js"

const createChatRoom = async (req, res) => {
    const group = { ...req.body };
    try {
      Chats.collection.dropIndexes();
  
      const chat = await Chats.create(group);
  
      return res.status(201).send(chat);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
}

const createMessage = async (req, res) => {
    try {
        const { body } = req;
        const message = await Chat.create(body);

        return res.status(201).send({ message });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export {
    createChatRoom,
    createMessage
}