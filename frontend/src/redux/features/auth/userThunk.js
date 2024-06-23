import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../../api/userApiSlice";

export const login = createAsyncThunk('userlogin', async ({ email, password }, { rejectWithValue }) => {
    try {
        const { data } = await loginUser({ email, password });
        // console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
})

export const register = createAsyncThunk('userregister', async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const { data } = await registerUser({ name, email, password });
        // console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
})

export const logout = createAsyncThunk('userlogout', async (_, { rejectWithValue }) => {
    try {
        const { data } = await logoutUser();
        localStorage.clear();
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
})