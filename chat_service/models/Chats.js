import mongoose from "mongoose";

import { Schema, model } from "mongoose";

const chatsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    members: [
        {
          type: new mongoose.Schema(
            {
              username: {
                type: String,
                unique: true,
                required: true,
              },
              joinedAt: {
                type: Date,
                default: Date.now(),
              },
            },
            { _id: false }
          ),
        },
      ],
})

const chatSchema = new Schema({
  
})

const Chats = mongoose.model("Chats", chatsSchema);
const Chat = mongoose.model("Chat", chatSchema);

export default {
  Chats,
  Chat
}