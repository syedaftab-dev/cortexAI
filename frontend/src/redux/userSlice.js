import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
    },
    reducers: {
        // state -- previous value of userData
        // action we want to do on data
        setUserdata: (state, action) => {
            state.userData = action.payload
        }
    }
})

// export reducers and slice to store.js
export const { setUserdata } = userSlice.actions
export default userSlice.reducer


// what is initialState and reducers here
/*
    const { data, setData } = useState(null)

    if we conpare this 
    null is intialState and reducers -- setData
*/