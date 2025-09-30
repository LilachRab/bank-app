import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const isAuthenticated = await api.auth.checkAuth();
            setIsAuthenticated(isAuthenticated);
        };

        verifyAuth();
    }, []);

    if (isAuthenticated === null) {
        // You can return a loading spinner here
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
