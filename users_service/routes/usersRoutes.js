import { Router } from "express";
import { addContact, 
        acceptContact, 
        createUser, 
        deleteContact, 
        searchContact, 
        requestsContact, 
        userProfile, 
        deleteRequest
    } from "../controllers/usersControllers.js";

const router = Router();

router.post('/createuser', createUser);
router.get('/userprofile', userProfile);
router.get('/searchcontact', searchContact);
router.post('/addcontact', addContact);
router.post('/deleterequest', deleteRequest);
router.get('/requests', requestsContact);
router.patch('/acceptcontact', acceptContact);
router.patch('/deletecontact', deleteContact);

export default router