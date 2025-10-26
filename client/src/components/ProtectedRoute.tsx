import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Spinner } from './ui/shadcn-io/spinner';
import { PageTitle } from './ui/typography';

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
        // Show loading state while checking authentication
        return (
            <div className="min-h-screen flex items-center justify-center flex-col space-y-6 bg-gray-100 dark:bg-gray-900">
                <PageTitle>Checking authentication...</PageTitle>
                <Spinner variant="ring" size={80} className="text-purple-600" />
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
