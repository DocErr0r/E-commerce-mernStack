import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import productSlice from "./features/product/productSlice";
import favoritesSlice from "./features/product/favoritesSlice";
// import userUpdateSlice from "./features/auth/userUpdateSlice";

const store=configureStore({
    reducer:{
        user:authSlice,
        product:productSlice,
        favoriat:favoritesSlice,
        // userUpdater:userUpdateSlice
    }
})
export default store;
