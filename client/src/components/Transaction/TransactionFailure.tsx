import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TransactionFailureProps {
    onClose: () => void;
    message?: string;
}

export const TransactionFailure = ({ onClose, message }: TransactionFailureProps) => {
    return (
        <div className="text-center space-y-6 animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                    <X className="w-8 h-8 text-white" />
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Transaction Failed!</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    {message || 'Your payment could not be processed, Please try again'}
                </p>
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={onClose}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                >
                    Close
                </Button>
            </div>
        </div>
    );
};
