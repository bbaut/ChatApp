import Message from "../models/Chats.js"
import Rooms from "../models/Rooms.js"

const createMessage = async (req, res) => {
    try {
        const { body } = req;
        const message = await Message.create(body);

        return res.status(201).send({ message });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

const createChatRoom = async (req, res) => {
    console.log(req.body)
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
    try {
        const { body } = req;
        const message = await Message.create(body);

        return res.status(201).send({ message });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export {
    createMessage,
    createChatRoom,
    getAllMessages
}