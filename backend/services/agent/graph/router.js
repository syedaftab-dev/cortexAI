// router agent

import { globalAgent } from "http";
import { getModel } from "../config/llmModels.js"

export const router = async (state)=>{
    // we will a llm to decide which agent will do the job

    const llm = await getModel("router");

    const prompt = `You are an agent router
    
    Available agents:
    - chat
    - search
    - coding
    - pdf
    - ppt
    - vision

    Rules:

    chat:
    General conversation,
    explanations,
    learning,
    questions.

    search:
    current events,
    latest information,
    news,
    recent developments,
    internet lookup.

    coding:
    Generate code,
    debug code,
    build projects,
    architecture,
    API design.

    pdf: 
    Questions about generate PDFs
    or document context.

    ppt:
    Questions about generate ppts
    or ppt context.

    vision:
    Generate image,
    create image

    Return ONLY one agent name in one word:

    chat 
    search
    coding
    pdf
    ppt
    vision

    User query:
    ${state.prompt}
    `

    const response = await llm.invoke(prompt);
    console.log("response:", response.content.trim().toLowerCase());
    return { 
        ...state,
        globalAgent: response.content.trim().toLowerCase()
     };

}