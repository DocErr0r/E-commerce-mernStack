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
// get product by id
export const getProductById = (id) => {
    return axiosInstace.get(`${PRODUCT_URL}/${id}`)
}

// get product by id
export const deleteProductById = (id) => {
    return axiosInstace.delete(`${PRODUCT_URL}/${id}`)
}

// update product by id
export const updateProductById = ({id,body}) => {
    return axiosInstace.put(`${PRODUCT_URL}/${id}`,body)
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