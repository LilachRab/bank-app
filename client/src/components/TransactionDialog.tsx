import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionLoading } from '@/components/TransactionLoading';
import { TransactionSuccess } from '@/components/TransactionSuccess';
import { TransactionFailure } from '@/components/TransactionFailure';
import { LockKeyhole } from 'lucide-react';
import type { Transaction } from '@/types/transaction';

type DialogStep = 'form' | 'loading' | 'success' | 'failure';

interface TransactionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTransactionSuccess: (newTransaction?: Transaction) => void;
}

export const TransactionDialog = ({ open, onOpenChange, onTransactionSuccess }: TransactionDialogProps) => {
    const [step, setStep] = useState<DialogStep>('form');
    const [progress, setProgress] = useState(0);

    // Step transitions
    useEffect(() => {
        if (open) {
            setStep('form');
        } else {
            setProgress(0);
        }
    }, [open]);

    const handleTransactionStart = () => {
        // Close the form and transition to loading after a brief delay
        setTimeout(() => {
            setStep('loading');
        }, 300);
    };

    const handleTransactionError = () => {
        setStep('failure');
    };

    const handleSuccessClose = () => {
        setProgress(0);
        onOpenChange(false);
    };

    const handleFailureClose = () => {
        setProgress(0);
        onOpenChange(false);
    };

    useEffect(() => {
        if (step !== 'loading') return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setStep('success'), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [step]);

    const renderContent = () => {
        switch (step) {
            case 'success':
                return <TransactionSuccess onClose={handleSuccessClose} />;
            case 'failure':
                return <TransactionFailure onClose={handleFailureClose} />;
            case 'loading':
                return <TransactionLoading progress={progress} />;
            case 'form':
                return (
                    <TransactionForm
                        onSubmitSuccess={(newTransaction) => {
                            if (newTransaction) {
                                onTransactionSuccess(newTransaction);
                            }
                        }}
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
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
};
