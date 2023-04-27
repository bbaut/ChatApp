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
    console.log(req.body)
}

const addContact = async (req,res) => {

}

const requestContact = async (req,res) => {

}

const deleteContact = async (req,res) => {

}

export {
    searchContact,
    addContact,
    requestContact,
    deleteContact,
    createUser
}