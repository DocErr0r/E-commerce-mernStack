import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    products: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        }
    },
    extraReducers: (builder) => { }
})

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;