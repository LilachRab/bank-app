import axios from 'axios';
import { API_URL } from '../constants';

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Response interceptor to handle errors gracefully
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if it's a connection error for auth endpoints
        if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
            // Don't log connection errors to console for auth checks
            if (error.config?.url?.includes('/users/me')) {
                // Silently reject for auth checks
                return Promise.reject(error);
            }
            console.error('Server connection error. Please ensure the server is running.');
        }
        return Promise.reject(error);
    }
);
