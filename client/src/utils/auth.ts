import { setCookie } from 'typescript-cookie';
import type { NavigateFunction } from 'react-router-dom';

export const handleLoginSuccess = (token: string, navigate: NavigateFunction) => {
    setCookie('token', token);
    navigate('/dashboard');
};

export const
    handleAuthSubmit = (e: React.FormEvent, email: string, password: string, navigate: NavigateFunction) => {
    e.preventDefault();
    // In a real app, you'd make an API call here
    console.log(email, password);
    handleLoginSuccess('fake-token', navigate);
};
