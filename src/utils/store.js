import { configureStore } from "@reduxjs/toolkit";

import apiConfigReducer from "./slices/apiConfigSlice";
import cartReducer from "./slices/cartSlice";

export const useStore = configureStore({ 
    devTools: true,
    reducer: {
        apiConfig : apiConfigReducer,
        cart : cartReducer
    } 
});

export default useStore;