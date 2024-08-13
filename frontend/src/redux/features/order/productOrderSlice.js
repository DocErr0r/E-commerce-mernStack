import { createSlice } from "@reduxjs/toolkit"

const decimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}
const productOrderSlice = createSlice({
    name: 'orderProduct',
    initialState: { orderProduct: [] },
    reducers: {
        setOrderProduct: (state, action) => {
            console.log(action.payload);
            state.orderProduct = action.payload
            state.itemsPrice = decimal(state.orderProduct.reduce((acc, item) => acc + item.price * item.qty, 0));
            state.shippingPrice = decimal(state.itemsPrice > 500 ? 0 : 40)
            state.tex = decimal(Number((state.itemsPrice * 0.18).toFixed(2)))
            state.totelPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.tex)).toFixed(2)
        },
        clearOrder: (state, action) => {
            state.orderProduct = []
        },
    }
})

export const { setOrderProduct, clearOrder } = productOrderSlice.actions
export default productOrderSlice.reducer;