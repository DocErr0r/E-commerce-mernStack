import { CATEGORY_URL } from "../contsants";
import axiosInstace from "./apiSlice";

// create category 
export const create = (body) => {
    return axiosInstace.post(`${CATEGORY_URL}/create`, body)
}
export const createCategory = async (body) => {
    try {
        const { data } = await create(body);
        // console.log(data)
        return data;
    } catch (error) {
        throw error
    }
}

// update category
export const updateCategory = (id, body) => {
    return axiosInstace.put(`${CATEGORY_URL}/categories/${id}`, body)
}
// export const updateCategory = async (id, body) => {
//     try {
//         const { data } = await update(id, body);
//         // console.log(data)
//         return data;
//     } catch (error) {
//         return (error.response.data.message || error.message);
//     }
// }

// delete category
export const deleteCategory = (id) => {
    return axiosInstace.delete(`${CATEGORY_URL}/categories/${id}`)
}
// export const deleteCategory = async (id) => {
//     try {
//         const { data } = await deleteCat(id);
//         // console.log(data)
//         return data;
//     } catch (error) {
//         return (error.response.data.message || error.message);
//     }
// }

// get all categories
const getAll = () => {
    return axiosInstace.get(`${CATEGORY_URL}/categories`,)
}
export const getAllCategory = async () => {
    try {
        const  {data}  = await getAll();
        // console.log(data)
        return data;
    } catch (error) {
        throw error;
    }
}

// get selected category
const getById = () => {
    return axiosInstace.get(`${CATEGORY_URL}/categories/${id}`,)
}
export const getCategory = async (id) => {
    try {
        const { data } = await getById(id);
        // console.log(data)
        return data;
    } catch (error) {
        throw error;
    }
}