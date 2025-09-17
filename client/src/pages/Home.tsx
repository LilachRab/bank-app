import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { ArrowRightLeft, SquareChartGantt } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

export const Home = () => {
    const purpleGradientBG = 'linear-gradient(90deg, #2E2355 0%, #654DBB 100%)';

    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
                <div className="w-full px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between">
                    {/* Logo left */}
                    <div className="flex items-center">
                        <Logo height={60} />
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {/* Sign in */}
                        <Link
                            to="/signin"
                            className="px-4 py-2 text-sm font-medium hover:font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                        >
                            Sign in
                        </Link>

                        {/* Open account (uses signup gradient) */}
                        <Link
                            to="/signup"
                            className="px-4 py-2 text-[15px] font-semibold text-white rounded-xl shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 hover:opacity-95"
                            style={{ background: purpleGradientBG }}
                        >
                            Open Account
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <main className="flex-grow">
                <section className="text-white" style={{ background: purpleGradientBG }}>
                    <div className="w-full px-3 sm:px-4 md:px-6 py-20 md:py-32 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Your Personal Bank</h1>
                        <p className="text-white/70 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                            Simplified banking designed for you. Secure, straightforward, and always available.
                        </p>
                        <Link
                            to="/signup"
                            className="inline-block bg-white text-[#2E2355] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
                        >
                            Get Started
                        </Link>
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
                            <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
                                <DialogTrigger asChild>
                                    <button className="text-gray-500 hover:text-black dark:text-gray-400 cursor-pointer">
                                        Privacy Policy
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                                    <DialogHeader>
                                        <DialogTitle>Privacy Policy</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                        I respect your privacy and am committed to protecting your personal information.
                                        Any data you share here is stored securely using Neon, and used solely to
                                        provide and improve my banking services. I do not sell or share your information
                                        (who cares about fake bank accounts, really) with third parties without your
                                        consent, except as required by law.
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>

                            <Dialog open={showTerms} onOpenChange={setShowTerms}>
                                <DialogTrigger asChild>
                                    <button className="text-gray-500 hover:text-black dark:text-gray-400 cursor-pointer">
                                        Terms of Service
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                                    <DialogHeader>
                                        <DialogTitle>Terms of Service</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                        By using my app, you agree to trust a junior full stack developer writing this
                                        app in collaboration with Cursor. I provide these banking 'services' with care,
                                        but I am not liable for issues caused by unauthorized access or by an Iranian
                                        cyber attack. I may update these terms occasionally, and continue add features,
                                        so use of the app constitutes acceptance of the changes.
                                        <br />
                                        <br />
                                        Good luck!
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
