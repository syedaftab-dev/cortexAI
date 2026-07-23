import { setConversations } from "../redux/conversationSlice.js";
import api from "../utils/axios";

// from backend
export const getConversations = async () => {
  try {
        const {data} = await api.get("/api/chat/get-conversations");
        console.log("Conversations fetched successfully", data);
        return data;
  } catch (error) {
    console.log("Error in fetching conversations");
    return [];
  }
}

