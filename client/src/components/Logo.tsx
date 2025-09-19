import { useTheme } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import blackLogo from '../assets/black-logo.svg';
import whiteLogo from '../assets/white-logo.svg';

interface LogoProps {
    height: number;
    className?: string;
}

export const Logo = ({ height, className }: LogoProps) => {
    const { theme } = useTheme();

    // Determine which logo to use based on the theme
    const logoSrc = theme === 'dark' ? whiteLogo : blackLogo;

    // Calculate the width based on the aspect ratio of the logo (1307x393)
    const aspectRatio = 1307 / 393;
    const width = height * aspectRatio;

    return (
        <Link to="/" className={`flex items-center justify-center ${className}`}>
            <img src={logoSrc} alt="Purple Bank Logo" style={{ height: `${height}px`, width: `${width}px` }} />
        </Link>
    );
};
