import express from "express";
import { loginSchema, signupSchema } from "../utils/userTypes.js";
import { userModel } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authMiddleware } from "../middleware/auth.js";
import upload from "../multer/multer.js";
import cloudinary from "../cloudinary/cloudinary.js";
dotenv.config();
export const userRouter = express.Router();
userRouter.post('/signup', async (req, res) => {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.data) {
        return res.status(400).json({
            "success": false,
            "error": "Invalid data"
        });
    }
    const { email, name, password } = parsedData.data;
    const checkUser = await userModel.findOne({
        email: email
    });
    if (checkUser) {
        return res.status(400).json({
            "success": false,
            "error": "user already exists, try login"
        });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        email: email,
        name: name,
        password: hashPassword
    });
    if (!user) {
        return res.status(400).json({
            "success": false,
            "error": "user not created"
        });
    }
    return res.status(201).json({
        "success": true,
        "data": user
    });
});
userRouter.post('/login', async (req, res) => {
    const parsedData = loginSchema.safeParse(req.body);
    if (!parsedData.data) {
        return res.status(400).json({
            "success": false,
            "error": "Invalid data"
        });
    }
    const { email, password } = parsedData.data;
    const checkUser = await userModel.findOne({
        email: email
    });
    if (!checkUser || !checkUser.password) {
        return res.status(400).json({
            "success": false,
            "error": "user not exists, try signup"
        });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
        return res.status(400).json({
            "success": false,
            "error": "email or password is wrong"
        });
    }
    const token = jwt.sign({
        id: checkUser._id
    }, process.env.JWT_SECRET);
    if (!token) {
        return res.status(400).json({
            "success": false,
            "error": "token not created"
        });
    }
    return res.status(201).json({
        "success": true,
        "token": token
    });
});
userRouter.get('/me', authMiddleware, async (req, res) => {
    const userId = req.id;
    console.log("userId", userId);
    const profile = await userModel.findOne({
        _id: userId
    });
    if (!profile) {
        return res.status(400).json({
            "success": false,
            "error": "profile not found"
        });
    }
    return res.status(201).json({
        "success": true,
        "data": profile
    });
});
userRouter.patch('/update', authMiddleware, async (req, res) => {
    const userId = req.id;
    const { name, password } = await req.body;
    const oldPassword = password?.oldPassword;
    const newPassword = password?.newPassword;
    if (name) {
        const changeUserName = await userModel.updateOne({
            _id: userId
        }, {
            name: name
        });
        if (!changeUserName) {
            res.status(400).json({
                "error": "name not changed"
            });
        }
        return res.status(201).json({
            "success": true,
            "data": "Name Changed SuccessFully"
        });
    }
    if (oldPassword && newPassword) {
        const getUser = await userModel.findById(userId);
        if (!getUser || !getUser.password) {
            return res.status(400).json({
                "success": false,
                "data": "user password not found"
            });
        }
        const checkPassword = await bcrypt.compare(oldPassword, getUser.password);
        if (!checkPassword) {
            return res.status(400).json({
                "success": false,
                "data": "Password Is Incorrect"
            });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const changePassword = await userModel.updateOne({
            _id: getUser.id
        }, {
            password: hashedNewPassword
        });
        if (changePassword) {
            return res.status(201).json({
                "success": true,
                "data": "Password Changed SuccessFully"
            });
        }
        else {
            return res.status(400).json({
                "success": false,
                "data": "Password Not Changed"
            });
        }
    }
});
userRouter.post("/upload", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file received" });
        }
        if (!req.file.mimetype.startsWith("image")) {
            return res.status(400).json({ message: "Not an image" });
        }
        const stream = cloudinary.uploader.upload_stream({ folder: "users" }, async (error, result) => {
            if (error)
                return res.status(500).json(error);
            await userModel.findByIdAndUpdate(req.id, { profileUrl: result?.secure_url }, { new: true });
            res.json({
                message: "Image uploaded",
                imageUrl: result?.secure_url
            });
        });
        stream.end(req.file?.buffer);
    }
    catch (err) {
        res.status(500).json({ message: "Upload failed" });
    }
});
//# sourceMappingURL=userRoute.js.map