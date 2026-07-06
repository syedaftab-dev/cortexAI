import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

// MIDDLWARE
// gateway to redirect to auth service
app.use("/auth",proxy(process.env.AUTH_SERVICE))


app.get("/",(req,res)=>{
    res.json({message:"Welcome to the Gateway"})
})

app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`);
});