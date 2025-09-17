import { useEffect, useMemo, useState } from 'react';
import blackLogo from '../assets/black-logo.png';
import whiteLogo from '../assets/white-logo.png';

type LogoProps = {
    className?: string;
    height?: number;
};

export const Logo = ({ className = '', height = 40 }: LogoProps) => {
    const getDark = () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    const [isDark, setIsDark] = useState<boolean>(getDark());

    useEffect(() => {
        const root = document.documentElement;
        const observer = new MutationObserver(() => setIsDark(root.classList.contains('dark')));
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const src = useMemo(() => (isDark ? whiteLogo : blackLogo), [isDark]);

    return <img src={src} alt="Purple Bank" style={{ height }} className={`h-[${height}px] ${className}`} />;
};
