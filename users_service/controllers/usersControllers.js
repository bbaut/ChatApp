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
        let requestsUsername = [];

        const requestsArray = user.requests

        for(let i = 0; i < requestsArray.length; i++) {
            const user = await Users.findById(requestsArray[i].from);
            const contact = await Users.findById(requestsArray[i].to);

            let requestObj = {
                from: user.username, 
                to: contact.username 
            }

            requestsUsername.push(requestObj);
        }

        user.requests = requestsUsername


        let contactsUsernameUser = [];

        const contactsArrayUser = user.contacts


        for(let i = 0; i < contactsArrayUser.length; i++) {
            const user = await Users.findById(contactsArrayUser[i]);
            contactsUsernameUser.push(user.username);
        }

        user.contacts = contactsUsernameUser;

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
    
    res.json(contact);
}

const addContact = async (req,res) => {
    const userSend = req.body.user;
    const userReceive = req.body.contact;

    try {
        const user = await Users.findOne({email: userSend.email}); //The one who sends the contact request
        const contact = await Users.findOne({email: userReceive.email});

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

        const requestObj = { 
            from: user._id, 
            to: contact._id 
        };

        const contactUpdated = await Users.findOneAndUpdate(
            { email: contact.email},
            { $push: { requests: requestObj } },
            { new: true }
        )

        let requestsUsername = [];

        const requestsArray = contactUpdated.requests

        for(let i = 0; i < requestsArray.length; i++) {
            const user = await Users.findById(requestsArray[i].from);
            const contact = await Users.findById(requestsArray[i].to);

            let requestObj = {
                from: user.username, 
                to: contact.username 
            }

            requestsUsername.push(requestObj);
        }

        contactUpdated.requests = requestsUsername

        return res.status(200).json(contactUpdated);
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const passIDtoUsername = async (req,res) => {
    const idsArray = req.query.ids.split(",")
    const usernameArray = [];

    try {
        for(let i = 0; i < idsArray.length; i++) {
            const user = await Users.findById(idsArray[i]);
            usernameArray.push(user.username)
        }

        res.json({usernames: usernameArray});
    }
    catch (error) {
        console.log(error);
    }
}

const acceptContact = async (req,res) => {
    const userSend = req.body.user;
    const userReceive = req.body.contact;

    try {
        const user = await Users.findOne({username: userSend.username}); //The one who receives the contact request
        const contact = await Users.findOne({username: userReceive.username});

        if(!user || !contact){
            const error = new Error('User not found');
            return res.status(404).json({msg: error.message});
        }

        if(user.contacts.includes(contact.username)){
            const error = new Error('Already friends');
            return res.status(404).json({msg: error.message});
        }

        const requestObj = { 
            from: user._id,
            to: contact._id 
        };

        const userID = user._id;
        const contactID = contact._id; 

        const userUpdated = await Users.findOneAndUpdate(
            {username: user.username},
            { $push: { contacts: contactID }},
            { new: true }
        )

        const contactUpdated = await Users.findOneAndUpdate(
            {username: contact.username},
            {$push: { contacts: userID },
            $pull: { requests: requestObj }},
            { new: true }
        )

        let contactsUsernameUser = [];
        let contactsUsernameContact = [];

        const contactsArrayUser = userUpdated.contacts
        const contactsArrayContact = contactUpdated.contacts

        for(let i = 0; i < contactsArrayUser.length; i++) {
            const user = await Users.findById(contactsArrayUser[i]);
            contactsUsernameUser.push(user.username);
        }

        userUpdated.contacts = contactsUsernameUser;

        for(let i = 0; i < contactsArrayContact.length; i++) {
            const user = await Users.findById(contactsArrayContact[i]);
            contactsUsernameContact.push(user.username);
        }

        contactUpdated.contacts = contactsUsernameContact;

        return res.status(200).json({userUpdated, contactUpdated});
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteRequest = async (req, res) => {
    const userSend = req.body.user;
    const userReceive = req.body.contact;

    try {
        const user = await Users.findOne({username: userSend.username}); //The one who receives the contact request
        const contact = await Users.findOne({username: userReceive.username});
        
        if (!user || !contact) {
            const error = new Error('User not found');
            return res.status(404).json({msg: error.message});
        }

        const requestObj = { 
            from: user.username,
            to: contact.username 
        };

        const contactUpdated = await Users.findOneAndUpdate(
            {username: contact.username},
            {$pull: { requests: requestObj } },
            { new: true }
        )

        return res.status(200).json(contactUpdated);

    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const addChatContact = async (req,res) => {
    const userSend = req.body.user;
    const userReceive = req.body.contact;

    try {
        const user = await Users.findOne({username: userSend.username}); 
        const contact = await Users.findOne({username: userReceive.username});

        if(!user || !contact){
            const error = new Error('User not found');
            return res.status(404).json({msg: error.message});
        }

        const userUsername = user.username;
        const contactUsername = contact.username; 

        const userUpdated = await Users.findOneAndUpdate(
            {username: user.username},
            { $push: { chatContacts: contactUsername }},
            { new: true }
        )

        const contactUpdated = await Users.findOneAndUpdate(
            {username: contact.username},
            {$push: { chatContacts: userUsername }},
            { new: true }
        )

        return res.status(200).json({userUpdated, contactUpdated});
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const addGroup = async (req, res) => {
    const createdBy = req.body.createdBy;
    const groupId = req.body._id;
    const groupName = req.body.groupName

    try {
        const user = await Users.findOne({username: createdBy});

        if(!user){
            const error = new Error('User not found');
            return res.status(404).json({msg: error.message});
        }

        const userGroupObject = {
            chatId : groupId,
            chatName: groupName
        }

        const userUpdated = await Users.findOneAndUpdate(
            {username: user.username},
            { $push: { groups: userGroupObject }},
            { new: true }
        )

        return res.status(200).json({userUpdated});
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const addMemberGroup = async (req,res) => {
    const memberToAdd = req.body.object.member
    try {
        const user = await Users.findOne({username: memberToAdd});
        
        if(!user){
            const error = new Error('User not found');
            return res.status(404).json({msg: error.message});
        }

        const userGroupObject = {
            chatId: req.body.object.id,
            chatName: req.body.object.chatName
        }

        const userUpdated = await Users.findOneAndUpdate(
            {username: user.username},
            { $push: { groups: userGroupObject }},
            { new: true }
        )

        return res.status(200).json({userUpdated});
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


export {
    searchContact,
    userProfile,
    addContact,
    passIDtoUsername,
    deleteRequest,
    requestsContact,
    acceptContact,
    createUser,
    addChatContact,
    addGroup,
    addMemberGroup
}