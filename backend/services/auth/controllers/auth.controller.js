import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import redis from "../../../shared/redis/redis.js";


// @desc: Login with firebase token
//@route: /api/auth/login
//@method: POST
export const login = async (req,res)=>{
    try {
        const {token} = req.body;
        const decoded = await getAuth(app).verifyIdToken(token); // verify token and get user data id ie firebase uid

        // check for uid to find user
        let user = await User.findOne({firebaseUid:decoded.uid});
        
        // if user not exist
        if(!user){
            user = await User.create({
                firebaseUid: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture
            })
        }

        // automate login under 7 days
        const sessionId=crypto.randomUUID(); // create an random session id for cookies
        
        await redis.set(`session-${sessionId}`,
            JSON.stringify({
                userId:user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }),"EX",7*24*60*60*1000);

        res.cookie("session",sessionId,{
            httpOnly:true,
            secure: false,
            maxAge: 7*24*60*60*1000,
            sameSite:'strict'
        })

        

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({error:"Error while login"})
    }
}


export const logOut = async (req,res)=>{
    try {
        // delete from redis, so we need seesion id
        const sessionId = req.cookies?.session;
        await redis.del(`session-${sessionId}`);
        
        res.clearCookie("session"); 
        
        return res.status(200).json({message:"Logout successful"})
    } catch (error) {
        return res.status(500).json({error:"Error while logout"})
    }
}