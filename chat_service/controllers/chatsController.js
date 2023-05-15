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

    const roomCreatedOne = await Rooms.find({
        createdBy: req.body.createdBy,
        member: req.body.member
    })

    const roomCreatedTwo = await Rooms.find({
        createdBy: req.body.member,
        member: req.body.createdBy
    })

    try {
        // const room = new Room({
        //     createdBy: user,
        //     member: contact
        // });

        if (roomCreatedOne.length === 0 ) {
            if(roomCreatedTwo.length === 0 ) {
                const room = new Rooms(req.body);
                const roomSaved = await room.save();
                res.json(roomSaved);
            }
            else {
                res.json(roomCreatedTwo[0]) 
            }
        }
        else {
            res.json(roomCreatedOne[0]) 
        }
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
                return {
                    text : msg.message.text,
                    sender: "sended"
                }
            }
            else {
                return {
                    text : msg.message.text,
                    sender: "received"
                    //sender: msg.sender
                }
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