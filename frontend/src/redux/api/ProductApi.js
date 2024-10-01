import { PRODUCT_URL, UPLOADS, USER_URL } from "../contsants"
import axiosInstace from "./apiSlice"

// create category 
export const createProduct = (body) => {
    // console.log(body);
    return axiosInstace.post(`${PRODUCT_URL}/create`, body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// // get products
export const getAllProducts = (keyword = "", sortBy = "", page = 1, limit = 15) => {
    return axiosInstace.get(`${PRODUCT_URL}/search?keyword=${keyword}&limit=${Number(limit)}&page=${Number(page)}&sort=${sortBy}`)
}

// get products
export const getProducts = () => {
    return axiosInstace.get(`${PRODUCT_URL}`)
}

// get Top products
export const getTopProducts = () => {
    return axiosInstace.get(`${PRODUCT_URL}/top`)
}

// get Top products
export const getNewProducts = () => {
    return axiosInstace.get(`${PRODUCT_URL}/new`)
}

// get admin products
export const getAdminProducts = () => {
    return axiosInstace.get(`${PRODUCT_URL}/me/products`)
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
export const updateProductById = ({ id, body }) => {
    return axiosInstace.put(`${PRODUCT_URL}/${id}`, body)
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

// give review of product
export const addReview = ({ id, body }) => {
    return axiosInstace.post(`${PRODUCT_URL}/${id}/review`, body)
}

// give handle wishlist of product
export const handleWishlist = (body) => {
    return axiosInstace.put(`${PRODUCT_URL}/wishlist`, body)
}

// give get wishlist of product
export const getWishlist = () => {
    return axiosInstace.get(`${USER_URL}/v1/me/wishlist`)
}