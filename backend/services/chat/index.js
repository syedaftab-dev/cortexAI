import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chat.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json())

app.use("/chat",chatRoutes)

app.get("/",(req,res)=>{
    res.json({message:"Welcome to the Chat Service"})
})

app.listen(PORT,()=>{
    console.log(`Chat Service is running on port ${PORT}`);
    connectDB();
})