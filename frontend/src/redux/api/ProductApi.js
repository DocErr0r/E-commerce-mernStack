import { PRODUCT_URL, UPLOADS } from "../contsants"
import axiosInstace from "./apiSlice"

// create category 
export const createProduct = (body) => {
    console.log(body);
    return axiosInstace.post(`${PRODUCT_URL}/create`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// get products
export const getProducts = () => {
    return axiosInstace.get(`${PRODUCT_URL}`)
}

// upload file
export const uploadImageFile = (body) => {
    return axiosInstace.post(`${UPLOADS}`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    )
}