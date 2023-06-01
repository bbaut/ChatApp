import mongoose from "mongoose";

import { Schema, model } from "mongoose";


const GroupsSchema = new Schema({
    createdBy: {
      type: String,
      required: true
    },
    members: {
      type: Array,
      required: true,
    },
    groupName: {
      type: String
    }
  })

const Groups = mongoose.model("Groups", GroupsSchema);

export default Groups