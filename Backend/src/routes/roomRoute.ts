import express from "express"
import { authMiddleware } from "../middleware/auth.js";
import { chatModel, roomModel } from "../db/db.js";
import { createRoomSchema } from "../utils/roomTypes.js";

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

    if(checkUniqueRoomName){
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

roomRouter.get('/getRooms', authMiddleware, async(req, res) => {
    const userId = req.id;

    const rooms = await roomModel.find({
        users: userId
    }).select("_id roomName")

    console.log("rooms", rooms);
     if(!rooms){
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

roomRouter.get('/chats/:id', authMiddleware, async (req, res) => {
    const roomId = req.params.id as string;
    console.log("room", roomId)

    const messages = await chatModel.find({
        room: roomId
    }).populate("user", "name, email").limit(100);
    
    if(!messages){
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
