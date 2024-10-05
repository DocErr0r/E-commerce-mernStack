import axios from "axios";
import { BASE_URL } from "../contsants";

const axiosInstace = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials:true
})

// error handling
axiosInstace.interceptors.response.use(
    response => response,
    error => {
        // globle error
        console.error(error);
        return Promise.reject(error)
    }
)

export default axiosInstace