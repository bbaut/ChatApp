import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    }
})

// Hash password

UserSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.checkPassword = async function (passwordForm){
    return await bcrypt.compare(passwordForm, this.password);
}

const User = mongoose.model("User", UserSchema);

// UserSchema.methods.toJSON = function(){
//     const {__v, password, _id, ...user} = this.toObject();
//     user.user_id = _id;
//     return user;
// }

export default User;