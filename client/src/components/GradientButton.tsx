import { Button } from './ui/button';
import { Spinner } from './ui/shadcn-io/spinner';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
}

export const GradientButton = ({ className, isLoading = false, disabled, children, ...props }: GradientButtonProps) => {
    return (
        <Button
            className={cn(
                'w-full text-white font-bold py-3 px-4 rounded-full shadow-lg transform transition-transform hover:scale-105 bg-gradient-purple',
                className
            )}
            type="submit"
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Spinner variant="default" size={20} className="text-white mr-2" />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </Button>
    );
};
