import type { Application } from "express-ws";
import type { WebSocket } from "ws";
import jwt, { type JwtPayload } from "jsonwebtoken"
import dotenv, { parse } from "dotenv"
import { chatModel, roomModel } from "../db/db.js";
import mongoose, { type ObjectId } from "mongoose";

dotenv.config();

interface SocketInterface {
    ws: WebSocket,
    userId: string,
    rooms: string[]
}

let allSocketConnection: SocketInterface[] = [];

export function registerWsRoutes(app: Application) {

    app.ws('/ws', (ws: WebSocket, req) => {
        console.log("websocket endpoint");
        const token = req.query?.token as string;
        console.log("token", token);

        const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const userId = decode.id;
        console.log("userID", userId);


        ws.on('message', async (data) => {
            const parsedMessage = JSON.parse(data.toString());

            switch (parsedMessage.type) {

                case "JOIN_ROOM":

                console.log("inside joinRoom");
                    const checkRoom = await roomModel.findOne({
                        roomName: parsedMessage.roomId
                    })

                    if (!checkRoom) {
                        ws.send("Incorrect RoomId")
                        return;
                    }

                    ws.roomId = checkRoom._id.toString();
                    ws.userId = userId;

                    await roomModel?.updateOne(
                        {_id: checkRoom._id},
                        {$addToSet: {users: userId}}
                    )

                    if(allSocketConnection.find(x => x.ws === ws)){
                        return;
                    }

                    allSocketConnection.push({
                        ws: ws,
                        userId: userId,
                        rooms: [ws.roomId!]
                    })
                    break;

                case "CHAT":

                    if(!ws.roomId || !ws.userId) {
                        ws.send("Join room first");
                        return;
                    }
                    
                    console.log("chat activated")
                    const saveMessage = await chatModel.create({
                        message: parsedMessage.message,
                        user: new mongoose.Types.ObjectId(ws.userId),
                        room: parsedMessage.roomId
                    })  

                    const MessageSender = await chatModel.findById(
                        saveMessage._id
                    ).populate("user", "_id name email profileUrl");

                    if (!saveMessage) {
                        ws.send("message was not saved");
                    }

                    const users = allSocketConnection.filter(x => x.rooms.includes(parsedMessage.roomId));

                    const payload = JSON.stringify({
                        type: "CHAT",
                        _id: saveMessage._id,
                        message: parsedMessage.message,
                        user: MessageSender?.user
                    })

                    console.log("message", payload);

                    users.forEach((user) => {
                        user.ws.send(payload);
                    })

                    break;

                case "LEAVE_ROOM":

                    if (!ws.roomId || !ws.userId) {
                        ws.send("Join room first");
                        return;
                    }

                    allSocketConnection = allSocketConnection.filter(x => x.ws !== ws);

                    ws.roomId = "";
                    ws.userId = "";

                    ws.send("Left Room");
                    break;
            }
        })

        ws.on("close", () => {
            allSocketConnection = allSocketConnection.filter(x => x.ws !== ws);
        })
    })
}