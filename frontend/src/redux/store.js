import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import productSlice from "./features/product/productSlice";
import favoritesSlice from "./features/product/favoritesSlice";
import categorySlice from "./features/category/categorySlice";
import cartSlice from "./features/Cart/cartSlice";
import productOrderSlice from "./features/order/productOrderSlice";
// import userUpdateSlice from "./features/auth/userUpdateSlice";

const store = configureStore({
    reducer: {
        user: authSlice,
        product: productSlice,
        favoriat: favoritesSlice,
        category: categorySlice,
        carts: cartSlice,
        productOrderSlice,
        // userUpdater:userUpdateSlice
    }
})
export default store;
