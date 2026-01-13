import jwt, {} from "jsonwebtoken";
import dotenv, { parse } from "dotenv";
import { chatModel, roomModel } from "../db/db.js";
import mongoose from "mongoose";
dotenv.config();
let allSocketConnection = [];
export function registerWsRoutes(app) {
    app.ws('/ws', async (ws, req) => {
        console.log("websocket endpoint");
        const token = req.query?.token;
        console.log("token", token);
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decode.id;
        console.log("userID", userId);
        ws.on('message', async (data) => {
            const parsedMessage = JSON.parse(data.toString());
            switch (parsedMessage.type) {
                case "JOIN_ROOM":
                    const checkRoom = await roomModel.findOne({
                        roomName: parsedMessage.roomId
                    });
                    if (!checkRoom) {
                        ws.send("Incorrect RoomId");
                        return;
                    }
                    ws.roomId = checkRoom._id.toString();
                    ws.userId = userId;
                    console.log("roomID by extended type", ws.roomId);
                    allSocketConnection.push({
                        ws: ws,
                        userId: userId,
                        rooms: [ws.roomId]
                    });
                    allSocketConnection.map((user) => {
                        console.log(user.rooms);
                        console.log(user.userId);
                    });
                    break;
                case "CHAT":
                    const saveMessage = await chatModel.create({
                        message: parsedMessage.message,
                        user: new mongoose.Types.ObjectId(ws.userId),
                        room: new mongoose.Types.ObjectId(ws.roomId)
                    });
                    if (!saveMessage) {
                        ws.send("message was not saved");
                    }
                    const users = allSocketConnection.filter(x => x.rooms.includes(ws.roomId));
                    users.forEach((user) => {
                        user.ws.send(parsedMessage.message);
                    });
                    break;
            }
        });
    });
}
//# sourceMappingURL=ws.js.map