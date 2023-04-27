import Users from "../models/Users.js";

const createUser = async (req,res) => {
    try {
        const user = new Users(req.body);
        const userSaved = await user.save();
        res.json(userSaved);
    }
    catch (error) {
        console.log(error);
    }
}

const searchContact = async (req,res) => {
    const {email} = req.body;

    const contact = await Users.findOne({email});

    if (!contact) {
        const error = new Error('User not found');
        return res.status(404).json({msg: error.message});
    }
    
    res.json(contact);
}

const addContact = async (req,res) => {
    const [userOne, userTwo] = req.body;

    try {
        const user = await Users.findOne({email: userOne.email});
        const contact = await Users.findOne({email: userTwo.email});

        if(!user || !contact){
            const error = new Error('User not found');
            return res.status(404).json({msg: error.message});
        }

        const contactId = contact._id; 
        if (user.contacts.includes(contactId)){
            const error = new Error ('User already in your contact list');
            return res.status(400).json({msg: error.message});
        }

        const userId = user._id; 
        if (contact.requests.includes(userId)){
            const error = new Error ('You have already sent a request to this contact');
            return res.status(400).json({msg: error.message});
        }

        await Users.findOneAndUpdate(
            {email: contact.email},
            { $push: { requests: userId } },
            { new: true }
        )

        return res.status(200).json(contact);
    }
    catch (error) {
        return res.status(500).send({ error: err.message });
    }
}

const deleteContact = async (req,res) => {

}

export {
    searchContact,
    addContact,
    deleteContact,
    createUser
}