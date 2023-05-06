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

const userProfile = async (req,res) => {
    try {
        const user = await Users.findOne(req.query);
        res.json(user);

    }
    catch (error) {
        console.log(error);
    }
}

const searchContact = async (req,res) => {
    const contact = await Users.findOne(req.query);

    if (!contact) {
        const error = new Error('User not found');
        return res.status(404).json({msg: error.message});
    }
    
    res.json(contact);
}

const requestsContact = async (req,res) => {
    const contact = await Users.findOne(req.query);
    console.log(contact)

    if (!contact) {
        const error = new Error('User not found');
        return res.status(404).json({msg: error.message});
    }

    console.log("ye")
    
    res.json(contact);
}

const addContact = async (req,res) => {
    const userOne = req.body.user;
    const userTwo = req.body.contact;

    try {
        const user = await Users.findOne({email: userOne.email}); //The one who sends the contact request
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

        const contactUpdated = await Users.findOneAndUpdate(
            {email: contact.email},
            { $push: { requests: userId } },
            { new: true }
        )

        return res.status(200).json(contactUpdated);
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const acceptContact = async (req,res) => {
    const [userOne, userTwo] = req.body;

    try {
        const user = await Users.findOne({email: userOne.email}); //The one who receives the contact request
        const contact = await Users.findOne({email: userTwo.email});

        if(!user || !contact){
            const error = new Error('User not found');
            return res.status(404).json({msg: error.message});
        }

        const userId = user._id;
        const contactId = contact._id; 

        const userUpdated = await Users.findOneAndUpdate(
            {email: user.email},
            {   $push: { contacts: contactId },
                $pull: { requests: contactId }                            
            },
            { new: true }
        )

        const contactUpdated = await Users.findOneAndUpdate(
            {email: contact.email},
            { $push: { contacts: userId } },
            { new: true }
        )

        return res.status(200).json({userUpdated, contactUpdated});
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteContact = async (req,res) => {

}

export {
    searchContact,
    userProfile,
    addContact,
    requestsContact,
    acceptContact,
    deleteContact,
    createUser
}