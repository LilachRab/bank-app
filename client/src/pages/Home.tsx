import { FeatureCard } from '@/components/FeatureCard';
import { Header } from '@/components/Header';
import { LegalDialogs } from '@/components/LegalDialogs';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, SquareChartGantt } from 'lucide-react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

interface Feature {
    icon: typeof SquareChartGantt | typeof ArrowRightLeft;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: SquareChartGantt,
        title: 'Manage Account',
        description: 'Check your account balance and see your latest transactions.',
    },
    {
        icon: ArrowRightLeft,
        title: 'Transfer Funds',
        description: 'Easily move money between accounts or to other people.',
    },
];

const HeroSection: FC = () => (
    <section className="text-white bg-gradient-purple">
        <div className="container mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Your Personal Bank</h1>
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-3xl mx-auto">
                Simplified banking designed for you. Secure, straightforward, and always available.
            </p>
            <Button
                asChild
                className="bg-white text-purple-dark px-8 py-4 font-bold text-lg hover:bg-gray-100 shadow-lg transform transition-transform hover:scale-105"
            >
                <Link to="/signup">Get Started</Link>
            </Button>
        </div>
    </section>
);

const FeaturesSection: FC = () => (
    <section className="bg-gray-50 py-10 md:py-12 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </div>
    </section>
);

const Footer: FC = () => (
    <footer className="bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-12 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
                <p className="text-gray-500 dark:text-gray-400 w-full md:w-auto text-center md:text-left md:pl-0">
                    © 2025 Purple Bank. All rights reserved.
                </p>
                <div className="flex items-center gap-6 w-full justify-center md:w-auto md:justify-end">
                    <LegalDialogs />
                </div>
            </div>
        </div>
    </footer>
);

export const Home: FC = () => {
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
                        <Button asChild className="transform transition-transform hover:scale-105 bg-gradient-purple">
                            <Link to="/signup" className="px-4 py-2 text-[15px] font-semibold text-white">
                                Open Account
                            </Link>
                        </Button>
                    </>
                }
            />

            <main className="bg-gray-50 dark:bg-gray-950 flex-grow">
                <HeroSection />
                <FeaturesSection />
            </main>

            <Footer />
        </div>
    );
};
