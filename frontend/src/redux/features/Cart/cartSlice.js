import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    cartItems: [], shopingAdress: {}, paymentMethod: "UPI",
}

const decimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}
const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { ...item } = action.payload
            const exist = state.cartItems.find(i => i._id === item._id)
            if (exist) {
                state.cartItems = state.cartItems.map((i) => i._id === item._id ? item : i)
            }
            else {
                state.cartItems.push(item)
            }
            state.itemsPrice = decimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            state.shippingPrice = decimal(state.itemsPrice > 500 ? 0 : 40)
            state.tex = decimal(Number((state.itemsPrice * 0.18).toFixed(2)))
            state.totelPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.tex)).toFixed(2)
            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeFormCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i._id !== action.payload)
            state.itemsPrice = decimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            state.shippingPrice = decimal(state.itemsPrice > 500 ? 0 : 40)
            state.tex = decimal(Number((state.itemsPrice * 0.18).toFixed(2)))
            state.totelPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.tex)).toFixed(2)
            localStorage.setItem('cart', JSON.stringify(state))
        },
        clearCart: (state, action) => {
            state.cartItems = []
            localStorage.removeItem('cart')
        },
        setShippingAddress: (state, action) => {
            state.shopingAdress = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        }
    },
})

export const { addToCart, removeFormCart, clearCart, setShippingAddress } = cartSlice.actions
export default cartSlice.reducer