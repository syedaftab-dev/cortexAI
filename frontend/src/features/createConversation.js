import api from "../utils/axios";

export const createConversation = async () => {
  try {
        const {data} = await api.post("/api/chat/create-conversation");
        console.log("Conversation created", data);
        return data.conversation;
  } catch (error) {
    console.log("Error in create conversation");
    return [];
  }
}

