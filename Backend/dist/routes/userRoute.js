import express from "express";
import { loginSchema, signupSchema } from "../utils/userTypes.js";
import { userModel } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authMiddleware } from "../middleware/auth.js";
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
        "data": token
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
//# sourceMappingURL=userRoute.js.map