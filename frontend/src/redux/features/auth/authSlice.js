import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('http://localhost:5678/api/auth/login', { email, password },
            { withCredentials: true },
            { headers: { "Content-Type": "application/json" } },
        );
        // localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
})

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    lodding: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => { state.lodding = true })
            .addCase(login.fulfilled, (state, action) => { state.lodding = false, state.error = null, state.userInfo = action.payload })
            .addCase(login.rejected, (state, action) => { state.lodding = false, state.userInfo = null, state.error = action.payload })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;