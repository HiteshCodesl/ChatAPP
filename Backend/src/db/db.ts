import mongoose, { mongo, Mongoose } from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const chatSchema = new mongoose.Schema({
    message: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    room: {type: mongoose.Schema.Types.ObjectId, ref: "room"}
})

const roomSchema = new mongoose.Schema({
    roomName: { type: String, unique: true }, 
    host: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    messages: {type: mongoose.Schema.Types.ObjectId, ref: "chat"},
})

export const userModel = mongoose.model("user", UserSchema);
export const chatModel = mongoose.model("chat", chatSchema);
export const roomModel = mongoose.model("room", roomSchema);
