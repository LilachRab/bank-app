import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';

export const ProtectedRoute = () => {
    const token = getCookie('token');

    return token ? <Outlet /> : <Navigate to="/" />;
};
