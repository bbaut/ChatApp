import mongoose from "mongoose";

import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    friends: {
        type: Array,
        default: []
    },
    requests: [{
        type: new Schema({
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true,
            }
        })
    }]
})

const Users = mongoose.model("User", UserSchema);

export default Users;