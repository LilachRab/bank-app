import { useNavigate } from 'react-router-dom';
import { removeCookie } from 'typescript-cookie';

export const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeCookie('token');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
            <div className="bg-white shadow dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                Welcome to your protected dashboard!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                You are successfully authenticated and can access this protected content.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
