import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import React from 'react';

interface HeaderProps {
    rightContent?: React.ReactNode;
}

export const Header = ({ rightContent }: HeaderProps) => {
    return (
        <header className="bg-white/80 dark:bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm dark:border-b dark:border-gray-700">
            <div className="w-full px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between">
                <Logo height={50} />
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {rightContent}
                </div>
            </div>
        </header>
    );
};
