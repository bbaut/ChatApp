import { Router } from "express";
import { createChatRoom, createMessage } from "../controllers/chatsController.js";

const router = Router();

router.post("/createchatroom", createChatRoom);
router.post('/createmessage', createMessage);

export default router