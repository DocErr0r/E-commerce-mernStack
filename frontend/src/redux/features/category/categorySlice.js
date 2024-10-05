import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: [],
    reducers: {
        setCategegories: (state, action) => {
            state = action.payloadload
        }
    }
})
export const { setCategegories } = categorySlice.actions
export default categorySlice.reducer