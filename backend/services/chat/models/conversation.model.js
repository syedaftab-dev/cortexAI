import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    title:{
        type: String,
        default: "New chat"
    },
    userId:{
        type: String
    }
},{
    timestamps: true
})

export default mongoose.model("Conversation",conversationSchema);