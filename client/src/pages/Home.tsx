import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ArrowRightLeft, SquareChartGantt } from 'lucide-react';
import { LegalDialogs } from '@/components/LegalDialogs';
import { purpleGradientBG } from '@/constants';
import { Button } from '@/components/ui/button';

export const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            <Header
                rightContent={
                    <>
                        <Link
                            to="/signin"
                            className="px-4 py-2 text-sm font-medium hover:font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                        >
                            Sign in
                        </Link>
                        <Button asChild className="transform transition-transform hover:scale-105">
                            <Link
                                to="/signup"
                                className="px-4 py-2 text-[15px] font-semibold text-white"
                                style={{ background: purpleGradientBG }}
                            >
                                Open Account
                            </Link>
                        </Button>
                    </>
                }
            />

            {/* Hero */}
            <main className="flex-grow">
                <section className="text-white" style={{ background: purpleGradientBG }}>
                    <div className="w-full px-3 sm:px-4 md:px-6 py-20 md:py-32 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Your Personal Bank</h1>
                        <p className="text-white/70 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                            Simplified banking designed for you. Secure, straightforward, and always available.
                        </p>
                        <Button
                            asChild
                            className="bg-white text-[#2E2355] px-10 py-5 font-bold text-xl hover:bg-gray-100 shadow-lg transform transition-transform hover:scale-105"
                        >
                            <Link to="/signup">Get Started</Link>
                        </Button>
                    </div>
                </section>

                {/* Features */}
                <section className="bg-gray-50 py-20 dark:bg-gray-950">
                    <div className="w-full px-3 sm:px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="text-center p-6">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 mx-auto mb-4">
                                    <SquareChartGantt className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Manage Account
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Check your account balance and see your latest transactions.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 mx-auto mb-4">
                                    <ArrowRightLeft className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Transfer Funds
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Easily move money between accounts or to other people.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-900">
                <div className="w-full px-3 sm:px-4 md:px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                        <p className="text-gray-500 dark:text-gray-400">© 2025 Purple Bank. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <LegalDialogs />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
