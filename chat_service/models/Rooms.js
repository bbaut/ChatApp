import mongoose from "mongoose";

import { Schema, model } from "mongoose";


const RoomsSchema = new Schema({
    createdBy: {
      type: String,
      required: true
    },
    member: {
      type: String,
      required: true,
    },
    groupName: {
      type: String
    }
  })

const Rooms = mongoose.model("Rooms", RoomsSchema);

export default Rooms