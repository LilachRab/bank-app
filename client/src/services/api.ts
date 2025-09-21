import { axiosInstance } from './axiosInstance';

export const api = {
    auth: {
        login: async (email: string, password: string) => {
            const response = await axiosInstance.post('/auth/login', { email, password });
            return response.data;
        },
        signup: async (fullName: string, email: string, password: string) => {
            const [firstName, lastName] = fullName.split(' ');
            const response = await axiosInstance.post('/auth/register', { firstName, lastName, email, password });
            return response.data;
        },
        logout: async () => {
            return await axiosInstance.post('/auth/logout');
        },
    },
    transaction: {
        makeTransaction: async (amount: number, receiverEmail: string) => {
            const response = await axiosInstance.post('/transactions/create', { amount, receiverEmail });
            return response.data;
        },
        getTransactions: async () => {
            const response = await axiosInstance.get('/transactions');
            return response.data;
        },
    },
    user: {
        getUser: async () => {
            const response = await axiosInstance.get('/users');
            return response.data;
        },
    },
    checkAuth: async () => {
        try {
            await axiosInstance.get('/auth/me');
            return true;
        } catch (error) {
            return false;
        }
    },
};
