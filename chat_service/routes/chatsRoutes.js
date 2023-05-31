import { Router } from "express";
import { createMessage, createChatRoom, getAllMessages, getRoom } from "../controllers/chatsController.js";

const router = Router();

router.post('/createmessage', createMessage);
router.post("/createchatroom", createChatRoom);
router.get('/getmessages',getAllMessages);
router.get('/getroom',getRoom);

export default router