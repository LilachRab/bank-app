import React from 'react';
import gradientCopilot from '../assets/gradient-copilot.png';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex-1 flex items-center justify-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full bg-white shadow-lg rounded-3xl overflow-hidden dark:bg-gray-800">
                {/* Form content */}
                <div className="pt-4 px-8 pb-8 md:pt-6 md:px-12 md:pb-12">{children}</div>

                {/* form right side image */}
                <div className="hidden md:block rounded-l-2xl overflow-hidden">
                    <img
                        alt="Abstract purple background"
                        className="h-full w-full object-cover"
                        src={gradientCopilot}
                    />
                </div>
            </div>
        </div>
    );
};
