import axiosInstace from "./apiSlice"
import { USER_URL } from "../contsants"


export const loginUser = ({ email, password }) => {
    return axiosInstace.post(`${USER_URL}/login`, { email, password },)
}
export const logoutUser = () => {
    return axiosInstace.post(`${USER_URL}/logout`)
}
export const registerUser = ({ name, email, password }) => {
    return axiosInstace.post(`${USER_URL}/createuser`, { name, email, password },)
}
export const updateCrUser = ({ name, email }) => {
    return axiosInstace.put(`${USER_URL}/v1/me`, { name, email },)
}
export const updatePassword = ({ password,newPassword,confirmPass }) => {
    return axiosInstace.put(`${USER_URL}/v1/me/updatepassword`, { password,newPassword,confirmPass},)
}
// export const loginUser = ({ email, password }) => {
//     return axiosInstace.post(`${USER_URL}/login`, { email, password },)
// }

