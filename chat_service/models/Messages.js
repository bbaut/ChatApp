import mongoose from "mongoose";

import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    message: {
      text: {
        type: String,
        required: true,
      }
    },
    sender: {
      type: String,
      required: true,
    },
    chatId: {
      type: String,
      required: true,
    }
    },
    {
      timestamps: true
    }
)


const Message = mongoose.model("Message", MessageSchema);

export default Message