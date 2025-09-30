import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Spinner } from './ui/shadcn-io/spinner';

interface TransactionLoadingDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TransactionLoadingDialog = ({ isOpen, onClose }: TransactionLoadingDialogProps) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            // Reset state when dialog closes
            setShowSuccess(false);
            setProgress(0);
            setIsTransitioning(false);
            return;
        }

        // Smooth progress animation from 0 to 100% over 5 seconds
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    // Start transition to success state
                    setIsTransitioning(true);
                    // Show success dialog after transition delay
                    setTimeout(() => {
                        setShowSuccess(true);
                        setIsTransitioning(false);
                    }, 300);
                    return 100;
                }
                return prev + 1;
            });
        }, 50); // Update every 50ms for smooth animation

        return () => clearInterval(progressInterval);
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
                {!showSuccess ? (
                    <div
                        className={`text-center space-y-6 transition-all duration-300 ease-in-out ${
                            isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                        }`}
                    >
                        {/* Loading Spinner */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <Spinner
                                    variant="ellipsis"
                                    size={48}
                                    className="text-purple-600 dark:text-purple-400"
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Processing Payment</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Please wait while we securely process your transaction...
                            </p>
                        </div>

                        {/* Main Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                            <Progress value={progress} className="w-full h-3" />
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-6 animate-in fade-in-0 zoom-in-95 duration-300">
                        {/* Success Icon */}
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        {/* Success Title */}
                        <div>
                            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">Payment Sent!</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Your money has been successfully sent. The recipient will be notified shortly.
                            </p>
                        </div>

                        {/* Done Button */}
                        <Button
                            onClick={handleClose}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold"
                        >
                            Done
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
