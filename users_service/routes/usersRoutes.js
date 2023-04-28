import { Router } from "express";
import { addContact, acceptContact, createUser, deleteContact, searchContact } from "../controllers/usersControllers.js";

const router = Router();

router.post('/createuser', createUser);
router.get('/searchcontact', searchContact);
router.post('/addcontact', addContact);
router.patch('/acceptcontact', acceptContact);
router.patch('/deletecontact', deleteContact);

export default router