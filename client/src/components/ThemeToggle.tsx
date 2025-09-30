import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from './ui/button';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 cursor-pointer"
            title="Toggle theme"
        >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
    );
};
