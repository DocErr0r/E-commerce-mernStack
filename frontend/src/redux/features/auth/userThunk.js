import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, loginUser, logoutUser, registerUser, updateCrUser, updatePassword } from "../../api/userApiSlice";

// const expireTime=new Date().getTime()+10*1000;

export const login = createAsyncThunk('userlogin', async ({ email, password }, { rejectWithValue }) => {
    try {
        const { data } = await loginUser({ email, password });
        // console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        // localStorage.setItem('expire',expireTime)
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
        return rejectWithValue(error.response.data.message || error.message);
    }
})

export const updatecr = createAsyncThunk('userupdate', async ({ name, email }, { rejectWithValue }) => {
    try {
        const { data } = await updateCrUser({ name, email });
        // console.log(data.data)
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data || error.message);
    }
})

export const updatePass = createAsyncThunk('updatePass', async ({ password, newPassword, confirmPass }, { rejectWithValue }) => {
    try {
        const { data } = await updatePassword({ password, newPassword, confirmPass });
        // console.log(data.data)
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message);
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


// admin thunks
// export const getAllUser = createAsyncThunk('getalluser', async (_, { rejectWithValue }) => {
//     try {
//         const data  = await getUsers()
//         console.log(data);

//     } catch (error) {
//         return rejectWithValue(error.response.data || error.message)
//     }
// })