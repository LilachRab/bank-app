import { useNavigate } from 'react-router-dom';
import { removeCookie } from 'typescript-cookie';
import { Header } from '@/components/Header';
import { LogOut, SendHorizontal } from 'lucide-react';
import { purpleGradientBG } from '@/constants';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/ui/typography';

export const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeCookie('token');
        navigate('/');
    };

    // TODO: Fetch user's name and balance from the API
    const userName = 'John Doe';
    const userBalance = '1,234.56';

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <Header
                rightContent={
                    <Button
                        onClick={handleLogout}
                        className="flex items-center text-sm font-medium text-white"
                        style={{ background: purpleGradientBG }}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                    </Button>
                }
            />

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12 text-center">
                <PageTitle variant="light">Welcome {userName}</PageTitle>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Your balance</p>
                <div className="mt-4 text-6xl font-bold text-gray-800 dark:text-gray-50 flex items-center justify-center">
                    {userBalance}
                    <span className="mr-4 ml-2">₪</span>
                </div>
                <Button className="mt-8 bg-yellow-400 text-gray-800 px-6 py-3 font-semibold hover:bg-yellow-500">
                    <SendHorizontal className="h-5 w-5 mr-2" />
                    Send money
                </Button>
                <div className="mt-12 rounded-xl shadow-md p-6 h-96" style={{ background: purpleGradientBG }}>
                    {/* Transactions or other content will go here */}
                </div>
            </main>
        </div>
    );
};
