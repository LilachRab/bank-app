import { Check } from 'lucide-react';
import { Button } from './ui/button';

interface TransactionSuccessProps {
    onClose: () => void;
}

export const TransactionSuccess = ({ onClose }: TransactionSuccessProps) => {
    return (
        <div className="text-center space-y-6 animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" />
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Transaction Successful!</h2>
                <p className="text-gray-600 dark:text-gray-400">Your payment has been processed successfully.</p>
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={onClose}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                >
                    Done
                </Button>
            </div>
        </div>
    );
};
