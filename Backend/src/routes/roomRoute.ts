import express from "express"
import { authMiddleware } from "../middleware/auth.js";
import { chatModel, roomModel, userModel } from "../db/db.js";
import { createRoomSchema } from "../utils/roomTypes.js";
import mongoose from "mongoose";
import { check } from "zod";

export const roomRouter = express.Router();

roomRouter.post('/create', authMiddleware, async (req, res) => {
    const userId = req.id;

    const parsedData = createRoomSchema.safeParse(req.body);

    if (!parsedData.data) {
        return res.status(404).json({
            "error": false,
            "data": "Invalid data"
        })
    }

    const { roomName } = parsedData.data;

    console.log("roomName", roomName);
    const checkUniqueRoomName = await roomModel.findOne({
        roomName: roomName
    })

    if (checkUniqueRoomName) {
        return res.status(404).json({
            "error": false,
            "data": "Room name Should be unique"
        })
    }

    const createRoom = await roomModel.create({
        roomName: roomName,
        host: userId,
    })

    if (!createRoom) {
        return res.status(404).json({
            "error": false,
            "data": "cannot create a room"
        })
    }

    return res.status(201).json({
        "success": true,
        "data": {
            roomId: createRoom._id,
            roomName: createRoom.roomName
        }
    })
})

roomRouter.patch('/joinRoom', authMiddleware, async (req, res) => {
    const userId = req.id;
    const parsedData = createRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            "success": false,
            "error": "not a valid roomName"
        })
    }

    const checkRoom = await roomModel.findOne({
        roomName: parsedData.data.roomName
    })

    if(!checkRoom){
        return res.status(400).json({
            "success": false,
            "error": "Room Not Found"
        })
    }

    if(checkRoom.users.find(x => x.toString() === userId )){
        return res.status(201).json({
            "success": true,
            "data": "User Already Joined"
        })
    }

    const joinRoom = await roomModel.updateOne({
        _id: checkRoom._id
    },{
        users: userId,
        roomName: checkRoom.roomName,
    })

    if(!joinRoom){
        return res.status(400).json({
            "success": false,
            "error": "Room Not Joined"
        })
    }

    return res.status(201).json({
            "success": true,
            "data": {
                "roomId": checkRoom._id,
                "roomName": checkRoom.roomName
            }
    })
})

roomRouter.get('/getRooms', authMiddleware, async (req, res) => {
    const userId = req.id;

    const rooms = await roomModel.find({
        users: userId,
    }).select("_id roomName")

    console.log("rooms", rooms);
    if (!rooms) {
        return res.status(401).json({
            "success": "false",
            "error": "failed to find the room or chat"
        })
    }

    return res.status(201).json({
        "success": "true",
        "data": rooms
    })
})

roomRouter.get('/chats', authMiddleware, async (req, res) => {
    const roomId = req.query.roomId as string;
    console.log("roomId", roomId);

    const messages = await chatModel.find({
        room: roomId
    }).populate("user", "name email profileUrl").limit(50);

    if (!messages) {
        return res.status(401).json({
            "success": "false",
            "error": "failed to find the room or chat"
        })
    }

    return res.status(201).json({
        "success": "true",
        "data": messages
    })
})
