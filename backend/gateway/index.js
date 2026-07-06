import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT;
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(cookieParser())

// MIDDLWARE
// gateway to redirect to auth service
app.use("/auth",proxy(process.env.AUTH_SERVICE))

app.use(express.json())


app.get("/",(req,res)=>{
    res.json({message:"Welcome to the Gateway"})
})

app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`);
});