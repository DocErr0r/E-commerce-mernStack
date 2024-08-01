import { createSlice } from "@reduxjs/toolkit";

const favoriatSlice = createSlice({
    name: 'favoriats',
    initialState:{fav:[]},
    reducers: {
        setFavirates: (state, action) => {
            state.fav = action.payload;
        }
    },
    extraReducers: (builder) => { }
})

export const { setFavirates } = favoriatSlice.actions;
export default favoriatSlice.reducer;