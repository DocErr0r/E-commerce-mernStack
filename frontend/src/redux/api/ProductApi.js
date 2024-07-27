import { PRODUCT_URL } from "../contsants"
import axiosInstace from "./apiSlice"

// create category 
export const createProduct = (body) => {
    return axiosInstace.post(`${CATEGORY_URL}/create`, body)
}

// get products
export const getProducts = () => {
    return axiosInstace.get(`${PRODUCT_URL}`)
}
