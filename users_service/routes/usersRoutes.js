import { Router } from "express";
import { addContact, createUser, deleteContact, requestContact, searchContact } from "../controllers/usersControllers.js";

const router = Router();

router.post('/createUser', createUser);
router.get('/searchcontact', searchContact);
router.patch('/addcontact', addContact);
router.post('/requestcontact', requestContact);
router.patch('/deletecontact', deleteContact);

export default router