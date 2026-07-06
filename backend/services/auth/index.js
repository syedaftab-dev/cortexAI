import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json())

app.use("/",router)

app.get("/",(req,res)=>{
    res.json({message:"Welcome to the Auth Service"})
})

app.listen(PORT,()=>{
    console.log(`Auth Service is running on port ${PORT}`);
    connectDB();
})