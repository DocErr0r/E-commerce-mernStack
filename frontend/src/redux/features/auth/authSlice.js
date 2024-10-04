import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register, updatePass, updatecr } from "./userThunk";
import { toast } from "react-toastify";

const initialState = {
    userInfo: false,
    lodding: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.lodding = false
            state.userInfo = action.payload
        },
        setloading: (state, action) => {
            state.lodding = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => { state.lodding = true })
            .addCase(login.fulfilled, (state, action) => { state.lodding = false, state.userInfo = action.payload, state.error = null })
            .addCase(login.rejected, (state, action) => { state.lodding = false, state.error = action.payload })

        builder
            .addCase(logout.pending, (state) => { state.lodding = true })
            .addCase(logout.fulfilled, (state, action) => { state.lodding = false, state.error = null, state.userInfo = null })
            .addCase(logout.rejected, (state, action) => { state.lodding = false, state.error = action.payload })

        builder
            .addCase(register.pending, (state) => { state.lodding = true })
            .addCase(register.fulfilled, (state, action) => { state.lodding = false, state.error = null, state.userInfo = action.payload })
            .addCase(register.rejected, (state, action) => { state.lodding = false, state.error = action.payload })

        builder
            .addCase(updatecr.pending, (state) => { state.lodding = true })
            .addCase(updatecr.fulfilled, (state, action) => { state.lodding = false, state.error = null, state.userInfo = action.payload })
            .addCase(updatecr.rejected, (state, action) => { state.lodding = false, state.error = action.payload })

        builder
            .addCase(updatePass.pending, (state) => { state.lodding = true })
            .addCase(updatePass.fulfilled, (state, action) => { state.lodding = false, state.error = null })
            .addCase(updatePass.rejected, (state, action) => {
                state.lodding = false, state.error = action.payload;
                // toast.error(state.error)
            })

        // builder
        //     .addCase(getAllUser.pending, (state) => { state.lodding = true })
        //     .addCase(getAllUser.fulfilled, (state, action) => { state.lodding = false, state.error = null })
        //     .addCase(getAllUser.rejected, (state, action) => { state.lodding = false, state.error = action.payload })

    }
})

export const { setUser,setloading } = authSlice.actions;
export default authSlice.reducer;