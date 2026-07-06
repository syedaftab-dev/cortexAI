import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;



app.get("/",(req,res)=>{
    res.json({message:"Welcome to the Auth Service"})
})

app.listen(PORT,()=>{
    console.log(`Auth Service is running on port ${PORT}`);
    connectDB();
})