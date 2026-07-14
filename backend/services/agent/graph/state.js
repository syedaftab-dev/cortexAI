import { Annotation } from "@langchain/langgraph";

// our custom state 
export const agentState = Annotation.Root({
    prompt: Annotation(),
    aiResponse:Annotation(),
    agent: Annotation(), // agent used
    conversationId: Annotation()
})

