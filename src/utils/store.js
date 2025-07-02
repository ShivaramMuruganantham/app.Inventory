import { configureStore } from "@reduxjs/toolkit";

import apiConfigReducer from "./slices/apiConfigSlice";

export const useStore = configureStore({ 
    devTools: true,
    reducer: {
        apiConfig : apiConfigReducer,
    } 
});

export default useStore;