import mongoose from "mongoose";

import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    message: {
      text: {
        type: String,
        required: true,
      }
    },
      users: Array,
      sender: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
    },
    {
      timestamps: true
    }
)

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


const Message = mongoose.model("Message", messageSchema);
const Chats = mongoose.model("Chats", chatsSchema);

export default {
  Message,
  Chats
}