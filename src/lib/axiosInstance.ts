import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
