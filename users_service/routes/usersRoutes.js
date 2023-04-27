import { Router } from "express";
import { addContact, createUser, deleteContact, searchContact } from "../controllers/usersControllers.js";

const router = Router();

router.post('/createUser', createUser);
router.get('/searchcontact', searchContact);
router.post('/addcontact', addContact);
router.patch('/deletecontact', deleteContact);

export default router