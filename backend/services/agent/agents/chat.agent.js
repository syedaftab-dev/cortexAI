import { getModel } from "../config/llmModels.js"

export const chatAgent = async (state)=>{
    

    const llm = getModel("chat")

    const prompt = "You are cortexAI, an intelligent AI Assistant "
    const response = (await llm).invoke([
        {
            role: "system",
            content: prompt
        },
        {
            role: "human",
            content: state.prompt
        }

    ])

        return {
            ...state,
            aiResponse: (await response).content
        }
}