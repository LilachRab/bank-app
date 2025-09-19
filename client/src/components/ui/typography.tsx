import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    variant?: 'bold' | 'light';
}

export const PageTitle = React.forwardRef<HTMLHeadingElement, PageTitleProps>(
    ({ className, children, variant = 'bold', ...props }, ref) => {
        const classes = cn(
            'text-3xl',
            {
                'font-bold text-gray-900 dark:text-gray-100': variant === 'bold',
                'font-light text-gray-700 dark:text-gray-300': variant === 'light',
            },
            className
        );

        return (
            <h1 ref={ref} className={classes} {...props}>
                {children}
            </h1>
        );
    }
);
PageTitle.displayName = 'PageTitle';
