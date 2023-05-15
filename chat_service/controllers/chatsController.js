import Message from "../models/Chats.js"
import Rooms from "../models/Rooms.js"

const createMessage = async (req, res) => {
    try {
        const message = await Message(req.body);
        const messageSaved = await message.save();
        res.json(messageSaved)
        // return res.status(201).send({ message });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

const createChatRoom = async (req, res) => {
    // const {user, contact} = req.body;

    try {
        // const room = new Room({
        //     createdBy: user,
        //     member: contact
        // });
        const room = new Rooms(req.body);
        const roomSaved = await room.save();
        res.json(roomSaved);
  
        // return res.status(200).send(roomSaved);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
}

const getAllMessages = async (req, res) => {
    const { chatId, from } = req.query;
    try {
        const messages = await Message.find({
            chatId: {
                $all: chatId
            }
        })
        .sort({updatedAt: 1});

        
        const shownMessages = messages.map((msg) => {
            if(from === msg.sender.toString()){
                return {text : msg.message.text}
            }
        })

        res.json(shownMessages);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export {
    createMessage,
    createChatRoom,
    getAllMessages
}