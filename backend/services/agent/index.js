import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/agent.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json())

app.use("/",router)

app.get("/",(req,res)=>{
    res.json({message:"Welcome to the Agent Service"})
})

app.listen(PORT,()=>{
    console.log(`Agent Service is running on port ${PORT}`);
    connectDB();
})