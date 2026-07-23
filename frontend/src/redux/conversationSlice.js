import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: "conversation",
    initialState: {
        conversations: [],
        selectedConversation: null,
    },
    reducers: {
        // when we get all conversation from databse we just overwrite everything
        setConversations: (state, action) => {
            state.conversations = action.payload
        },
        // when we update or add a new conversation at start
        addConversations: (state, action) => {
            state.conversations.unshift(action.payload)
        },
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        }
    }
})

// export reducers and slice to store.js
export const { setSelectedConversation,setConversations, addConversations } = conversationSlice.actions
export default conversationSlice.reducer


// what is initialState and reducers here
/*
    const { data, setData } = useState(null)

    if we conpare this 
    null is intialState and reducers -- setData
*/