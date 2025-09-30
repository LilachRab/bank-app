import { SendHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface SendMoneyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    variant?: 'default' | 'destructive';
}

export const SendMoneyButton = ({ className, icon, variant = 'default', ...props }: SendMoneyButtonProps) => {
    const buttonIcon = icon || <SendHorizontal className="h-5 w-5 mr-2" />;

    const variantClasses = {
        default: 'bg-yellow-400 text-gray-800 hover:bg-yellow-500',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
        <Button className={cn('px-6 py-3 font-semibold', variantClasses[variant], className)} {...props}>
            {buttonIcon}
            Send money
        </Button>
    );
};
