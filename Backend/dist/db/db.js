import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileUrl: { type: String, default: null }
});
const chatSchema = new mongoose.Schema({
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
});
const roomSchema = new mongoose.Schema({
    roomName: { type: String, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
export const userModel = mongoose.model("User", UserSchema);
export const chatModel = mongoose.model("Chat", chatSchema);
export const roomModel = mongoose.model("Room", roomSchema);
//# sourceMappingURL=db.js.map