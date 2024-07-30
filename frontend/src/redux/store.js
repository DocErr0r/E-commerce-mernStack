import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import productSlice from "./features/product/productSlice";
// import userUpdateSlice from "./features/auth/userUpdateSlice";

const store=configureStore({
    reducer:{
        user:authSlice,
        product:productSlice,
        // userUpdater:userUpdateSlice
    }
})
export default store;
