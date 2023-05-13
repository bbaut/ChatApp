import { Router } from "express";
import { createMessage, createChatRoom, getAllMessages } from "../controllers/chatsController.js";

const router = Router();

router.post('/createmessage', createMessage);
router.post("/createchatroom", createChatRoom);
router.get('/getmessages',getAllMessages);

export default router