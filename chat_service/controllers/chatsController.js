import Message from "../models/Chats.js"
import Rooms from "../models/Rooms.js"
import Groups from "../models/Groups.js";

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

    // console.log(roomCreatedOne)
    // console.log(roomCreatedTwo)

    try {
        if (roomCreatedOne.length === 0 ) {
            if(roomCreatedTwo.length === 0 ) {
                console.log("1")
                const room = new Rooms(req.body);
                const roomSaved = await room.save();
                return res.json(roomSaved);
            }
            else {
                console.log("2")
                return res.json(roomCreatedTwo[0])
            }
        }
        else {
            console.log("3")
            console.log(roomCreatedOne[0])
            res.json( roomCreatedOne[0])
        }
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
}

const createGroupRoom = async (req, res) => {

    try {
        const group = new Groups(req.body);
        const groupSaved = await group.save();
        res.json(groupSaved);
    
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

const getRoom = async (req, res) => {

    const id = req.query.id


    try {
        const room = await Rooms.findById(id)
        res.json(room)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

const getGroup = async (req, res) => {
    const id = req.query.id


    try {
        const group = await Groups.findById(id)
        res.json(group)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
const addMemberGroup = async (req, res) => {
    const chatObject = req.body.object 
    try {
        const chat = await Groups.findById(chatObject.id)

        chatUpdated = await Groups.findOneAndUpdate(
                {_id: chatObject.id},
                { $push: { members: chatObject.member }},
                { new: true }
        )
        res.json(chatUpdated)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export {
    createMessage,
    createChatRoom,
    createGroupRoom,
    getAllMessages,
    getRoom,
    getGroup,
    addMemberGroup
}