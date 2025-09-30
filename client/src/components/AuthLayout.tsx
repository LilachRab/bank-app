import React from 'react';
import gradientCopilot from '../assets/gradient-copilot.png';
import { Card, CardContent } from '@/components/ui/card';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className="flex-1 flex items-center justify-center p-4">
            <Card className="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full rounded-3xl overflow-hidden dark:bg-gray-800 border-0 shadow-2xl">
                {/* Form content */}
                <CardContent className="pt-4 px-8 pb-8 md:pt-6 md:px-12 md:pb-12">{children}</CardContent>

                {/* form right side image */}
                <div className="hidden md:block rounded-l-2xl overflow-hidden">
                    <img
                        alt="Abstract purple background"
                        className="h-full w-full object-cover"
                        src={gradientCopilot}
                    />
                </div>
            </Card>
        </main>
    );
};
