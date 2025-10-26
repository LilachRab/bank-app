import { axiosInstance } from './axiosInstance';
import type { CreateTransactionRequest } from '@/types/transaction';

const getCurrentUser = async () => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
};

export const api = {
    auth: {
        signin: async (email: string, password: string) => {
            const response = await axiosInstance.post('/auth/signin', { email, password });
            return response.data;
        },
        signup: async (fullName: string, email: string, password: string) => {
            const [firstName, lastName] = fullName.split(' ');
            const response = await axiosInstance.post('/auth/signup', { firstName, lastName, email, password });
            return response.data;
        },
        signout: async () => {
            return await axiosInstance.post('/auth/signout');
        },
        checkAuth: async () => {
            try {
                await getCurrentUser();
                return true;
            } catch (error) {
                return false;
            }
        },
    },
    transaction: {
        makeTransaction: async (transactionData: CreateTransactionRequest) => {
            const response = await axiosInstance.post('/transactions/create', transactionData);
            return response.data;
        },
        getTransactions: async () => {
            const response = await axiosInstance.get('/transactions');
            return response.data;
        },
    },
    user: {
        getUser: async () => {
            const response = await getCurrentUser();
            return response;
        },
    },
};
