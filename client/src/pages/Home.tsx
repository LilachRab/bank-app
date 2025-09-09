import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Home = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to BankApp</h2>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            onClick={() => setShowLogin(true)}
                            className={`px-4 py-2 rounded-md ${
                                showLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setShowLogin(false)}
                            className={`px-4 py-2 rounded-md ${
                                !showLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
                <div className="mt-8">{showLogin ? <Login /> : <Signup />}</div>
            </div>
        </div>
    );
};

export default Home;
