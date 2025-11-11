import axios from 'axios';

export const extractErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
};
