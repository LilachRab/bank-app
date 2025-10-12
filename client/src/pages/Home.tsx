import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ArrowRightLeft, SquareChartGantt } from 'lucide-react';
import { LegalDialogs } from '@/components/LegalDialogs';
import { PURPLE_GRADIENT_BG } from '@/constants';
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
                                style={{ background: PURPLE_GRADIENT_BG }}
                            >
                                Open Account
                            </Link>
                        </Button>
                    </>
                }
            />

            {/* main content */}
            <main className="bg-gray-50 dark:bg-gray-950 flex-grow">
                <section className="text-white" style={{ background: PURPLE_GRADIENT_BG }}>
                    <div className="w-full px-3 sm:px-4 md:px-6 py-20 md:py-28 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Your Personal Bank</h1>
                        <p className="text-white/70 text-base md:text-lg mb-8 max-w-3xl mx-auto">
                            Simplified banking designed for you. Secure, straightforward, and always available.
                        </p>
                        <Button
                            asChild
                            className="bg-white text-[#2E2355] px-8 py-4 font-bold text-lg hover:bg-gray-100 shadow-lg transform transition-transform hover:scale-105"
                        >
                            <Link to="/signup">Get Started</Link>
                        </Button>
                    </div>
                </section>

                {/* Features */}
                <section className="bg-gray-50 py-10 md:py-12 dark:bg-gray-950">
                    <div className="w-full px-3 sm:px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <div className="text-center p-4">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 mx-auto mb-3">
                                    <SquareChartGantt className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Manage Account
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Check your account balance and see your latest transactions.
                                </p>
                            </div>
                            <div className="text-center p-4">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 mx-auto mb-3">
                                    <ArrowRightLeft className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Transfer Funds
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
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
