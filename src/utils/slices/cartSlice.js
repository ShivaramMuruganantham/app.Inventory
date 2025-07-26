import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart(state, action) {
            const existing = state.cartItems.find(item => item.id === action.payload.id)
            if (existing) {
                existing.cartQuantity += 1;
            }
            else {
                state.cartItems.push({...action.payload, cartQuantity: 1})
            }
        },
        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
        },
        clearCart(state) {
            state.cartItems = [];
        },
        incrementQuantity(state, action) {
            const item = state.cartItems.find(item => item.id === action.payload.id)
            if (item) {
                item.cartQuantity += 1;
            }
        },
        decrementQuantity(state, action) {
            const item = state.cartItems.find(item => item.id === action.payload.id)
            if (item && item.cartQuantity > 1) {
                item.cartQuantity -= 1;
            }
        },


    },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;