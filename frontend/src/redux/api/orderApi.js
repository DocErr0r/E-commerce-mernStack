import { DASHBOARD_URL, ORDER_URL, PAYMENT_URL } from "../contsants"
import axiosInstace from "./apiSlice"

export const getRazorpayKey=()=>{
    return axiosInstace.get(`${ORDER_URL}/razorpay-key`)
}
export const createRazorOrder=(amount)=>{
    return axiosInstace.post(`${ORDER_URL}/crate-razororder`,{amount})
}
export const createOrder = (body) => {
    return axiosInstace.post(ORDER_URL, body)
}

export const getOrderDetail = (id) => {
    return axiosInstace.get(`${ORDER_URL}/${id}`)
}

export const getMyOrders = () => {
    return axiosInstace.get(`${ORDER_URL}/me/orders`)
}

export const payOrder = ({ id, body }) => {
    return axiosInstace.put(`${ORDER_URL}/${id}/paid`, body)
}

export const deliverOrder = (id) => {
    return axiosInstace.put(`${ORDER_URL}/${id}/deliver`)
}

export const getAllOrders = () => {
    return axiosInstace.get(ORDER_URL)
}

export const getClientId = () => {
    return axiosInstace.get(PAYMENT_URL)
}

export const getDashboradData = () => {
    return axiosInstace.get(DASHBOARD_URL)
}