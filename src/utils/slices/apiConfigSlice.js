import { createSlice } from "@reduxjs/toolkit";

const apiConfigSlice = createSlice({
    name: "apiConfigSlice",
    initialState: {
        baseURL : 'http://127.0.0.1:8000/api',
    },

    reducers: {
        setBaseURL : (state, action) => {
            state.baseURL = action.payload
        }
    }, 
})

export const { setBaseURL } = apiConfigSlice.actions;
export default apiConfigSlice.reducer;