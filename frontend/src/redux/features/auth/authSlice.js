import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./userThunk";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    lodding: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.userInfo = null;
        //     localStorage.clear();
        //     logouting();
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => { state.lodding = true })
            .addCase(login.fulfilled, (state, action) => { state.lodding = false, state.userInfo = action.payload })
            .addCase(login.rejected, (state, action) => { state.lodding = false, state.error = action.payload })

        builder
            .addCase(logout.pending, (state) => { state.lodding = true })
            .addCase(logout.fulfilled, (state, action) => { state.lodding = false, state.error = null, state.userInfo = null })
            .addCase(logout.rejected, (state, action) => { state.lodding = false, state.error = action.payload })

        builder
            .addCase(register.pending, (state) => { state.lodding = true })
            .addCase(register.fulfilled, (state, action) => { state.lodding = false, state.userInfo = action.payload })
            .addCase(register.rejected, (state, action) => { state.lodding = false, state.error = action.payload })
    }
})

export const { } = authSlice.actions;
export default authSlice.reducer;