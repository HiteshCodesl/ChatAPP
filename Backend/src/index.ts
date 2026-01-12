import express from "express"
import cors from "cors"
import {userRouter} from "./routes/userRoute.js"
import { roomRouter } from "./routes/roomRoute.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

const connectToDatabase = async() => {
    await mongoose.connect(process.env.MONGODB_URL!);
}

connectToDatabase();

app.use('/user', userRouter);
app.use('/room', roomRouter);

app.listen(3000);