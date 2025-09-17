import gradientCopilot from '../assets/gradient-copilot.png';
import { Logo } from '../components/Logo';
import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Signup = () => {
    const purpleGradientBG = 'linear-gradient(90deg, #2E2355 0%, #654DBB 100%)';

    return (
        <div
            className="bg-gray-100 min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-100"
            style={{ fontFamily: 'Roboto, sans-serif' }}
        >
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
                <div className="w-full px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between">
                    <Logo height={40} />
                    <ThemeToggle />
                </div>
            </header>

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full bg-white shadow-lg rounded-3xl overflow-hidden dark:bg-gray-800">
                    {/* Left side - Form content */}
                    <div className="pt-4 px-8 pb-8 md:pt-6 md:px-12 md:pb-12">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Open your account Now</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">Welcome! Let's set up your account</p>

                        <form action="#" method="POST">
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                    htmlFor="name"
                                >
                                    Full Name
                                </label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:border-gray-700"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Enter your name"
                                    type="text"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                    htmlFor="email"
                                >
                                    Email address
                                </label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:border-gray-700"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:border-gray-700"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    type="password"
                                />
                            </div>

                            <div className="flex items-center mb-6">
                                <input
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                />
                                <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300" htmlFor="terms">
                                    I agree to the{' '}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button
                                                type="button"
                                                className="text-blue-600 hover:text-blue-500 underline cursor-pointer"
                                            >
                                                terms & policy
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                                            <DialogHeader>
                                                <DialogTitle>Terms of Service</DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription>
                                                By using my app, you agree to trust a junior full stack developer
                                                writing this app in collaboration with Cursor. I provide these banking
                                                'services' with care, but I am not liable for issues caused by
                                                unauthorized access or by an Iranian cyber attack. I may update these
                                                terms occasionally, and continue add features, so use of the app
                                                constitutes acceptance of the changes.
                                            </DialogDescription>
                                            <DialogHeader className="mt-4">
                                                <DialogTitle>Privacy Policy</DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription>
                                                I respect your privacy and am committed to protecting your personal
                                                information. Any data you share here is stored securely using Neon, and
                                                used solely to provide and improve my banking services. I do not sell or
                                                share your information (who cares about fake bank accounts, really) with
                                                third parties without your consent, except as required by law.
                                            </DialogDescription>
                                        </DialogContent>
                                    </Dialog>
                                </label>
                            </div>

                            <button
                                className="w-full text-white font-bold py-3 px-4 rounded-4xl focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-99 hover:opacity-95 transition-all duration-100 cursor-pointer"
                                style={{
                                    background: purpleGradientBG,
                                }}
                                type="submit"
                            >
                                Signup
                            </button>

                            <div className="my-6 flex items-center">
                                <div className="flex-grow bg-gray-300 h-px"></div>
                                <span className="flex-shrink text-sm text-gray-500 px-4">or</span>
                                <div className="flex-grow bg-gray-300 h-px"></div>
                            </div>

                            <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 cursor-pointer">
                                <img
                                    alt="Google icon"
                                    className="h-5 w-5 mr-2"
                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                />
                                Sign in with Google
                            </button>

                            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                                Have an account?{' '}
                                <Link className="font-medium text-blue-600 hover:text-blue-500" to="/signin">
                                    Sign In
                                </Link>
                            </p>
                        </form>
                    </div>

                    {/* Right side - Background image */}
                    <div className="hidden md:block rounded-l-2xl overflow-hidden">
                        <img
                            alt="Abstract purple background"
                            className="h-full w-full object-cover"
                            src={gradientCopilot}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
