import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionLoading } from '@/components/TransactionLoading';
import { TransactionSuccess } from '@/components/TransactionSuccess';
import { TransactionFailure } from '@/components/TransactionFailure';
import { LockKeyhole } from 'lucide-react';
import type { CreateTransactionRequest } from '@/types/transaction';

type DialogStep = 'form' | 'loading' | 'success' | 'failure';

interface TransactionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    createTransaction: (transactionData: CreateTransactionRequest) => Promise<string>;
}

export const TransactionDialog = ({ open, onOpenChange, createTransaction }: TransactionDialogProps) => {
    const [step, setStep] = useState<DialogStep>('form');
    const [progress, setProgress] = useState(0);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pendingSuccessRef = useRef<string | null>(null);
    const pendingErrorRef = useRef<string | null>(null);

    // Progress bar constants
    const PROGRESS_MAX = 100;
    const PROGRESS_INCREMENT = 1;
    const PROGRESS_INTERVAL_MS = 50;
    const ERROR_PROGRESS_THRESHOLD = 30; // Show error after 30% progress

    // Step transitions
    useEffect(() => {
        if (open) {
            setStep('form');
            // Clear any pending results when dialog opens
            pendingSuccessRef.current = null;
            pendingErrorRef.current = null;
        } else {
            setProgress(0);
        }
    }, [open]);

    const handleTransactionStart = () => {
        // Close the form and transition to loading after a brief delay
        const timeout = setTimeout(() => {
            setStep('loading');
        }, 300);
        loadingTimeoutRef.current = timeout;
    };

    const handleTransactionError = (message: string) => {
        // Store the error message to show after loading reaches threshold
        pendingErrorRef.current = message;
    };

    const handleTransactionSuccess = (message: string) => {
        // Store the success message to show after loading completes
        pendingSuccessRef.current = message;
    };

    const handleSuccessClose = () => {
        setProgress(0);
        pendingSuccessRef.current = null;
        pendingErrorRef.current = null;
        onOpenChange(false);
    };

    const handleFailureClose = () => {
        setProgress(0);
        pendingSuccessRef.current = null;
        pendingErrorRef.current = null;
        onOpenChange(false);
    };

    useEffect(() => {
        if (step !== 'loading') {
            setProgress(0);
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + PROGRESS_INCREMENT;

                // Check for pending error at threshold
                if (pendingErrorRef.current && newProgress >= ERROR_PROGRESS_THRESHOLD) {
                    clearInterval(interval);
                    setErrorMessage(pendingErrorRef.current);
                    setStep('failure');
                    pendingErrorRef.current = null;
                    return ERROR_PROGRESS_THRESHOLD;
                }

                // Check for pending success at completion
                if (pendingSuccessRef.current && newProgress >= PROGRESS_MAX) {
                    clearInterval(interval);
                    setSuccessMessage(pendingSuccessRef.current);
                    setStep('success');
                    pendingSuccessRef.current = null;
                    return PROGRESS_MAX;
                }

                return newProgress;
            });
        }, PROGRESS_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [step]);

    const renderContent = () => {
        switch (step) {
            case 'success':
                return <TransactionSuccess onClose={handleSuccessClose} message={successMessage} />;
            case 'failure':
                return <TransactionFailure onClose={handleFailureClose} message={errorMessage} />;
            case 'loading':
                return <TransactionLoading progress={progress} />;
            case 'form':
                return (
                    <TransactionForm
                        createTransaction={createTransaction}
                        onSubmitSuccess={handleTransactionSuccess}
                        onTransactionError={handleTransactionError}
                        buttonIcon={<LockKeyhole className="h-5 w-5 mr-2" />}
                        buttonVariant="destructive"
                        onTransactionStart={handleTransactionStart}
                        isTransitioning={false}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={step === 'loading' || step === 'success' || step === 'failure' ? undefined : onOpenChange}
        >
            <DialogContent
                className={`!transition-all !duration-300 !ease-in-out !data-[state=open]:animate-none !data-[state=closed]:animate-none !data-[state=open]:fade-in-0 !data-[state=closed]:fade-out-0 ${
                    step === 'loading' || step === 'success' || step === 'failure' ? '[&>button]:!hidden' : ''
                }`}
            >
                <DialogTitle className="sr-only">
                    {step === 'form' && 'Send Money'}
                    {step === 'loading' && 'Processing Transaction'}
                    {step === 'success' && 'Transaction Successful'}
                    {step === 'failure' && 'Transaction Failed'}
                </DialogTitle>
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
};
