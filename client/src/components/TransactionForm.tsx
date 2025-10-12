import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/services/api';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { SendMoneyButton } from './SendMoneyButton';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';
import { Label } from './ui/label';
import { type Transaction } from '@/types/transaction';
import moneyFlies from '../assets/moneyFlies.png';

const formSchema = z.object({
    receiverEmail: z
        .string()
        .min(1, 'Email is required')
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
    amount: z
        .string()
        .min(1, 'Amount is required')
        .regex(/^[1-9]\d*$/, 'Amount must be a positive number and cannot start with 0'),
});

type TransactionFormValues = z.infer<typeof formSchema>;

interface TransactionFormProps {
    onSubmitSuccess?: (newTransaction?: Transaction) => void;
    onTransactionError?: () => void;
    buttonIcon?: React.ReactNode;
    buttonVariant?: 'default' | 'destructive';
    onTransactionStart?: () => void;
    isTransitioning?: boolean;
}

export const TransactionForm = ({
    onSubmitSuccess,
    onTransactionError,
    buttonIcon,
    buttonVariant,
    onTransactionStart,
    isTransitioning = false,
}: TransactionFormProps) => {
    const [isVerified, setIsVerified] = useState(false);

    const form = useForm<TransactionFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            receiverEmail: '',
            amount: '',
        },
    });

    const onSubmit = async (values: TransactionFormValues) => {
        console.log('Form submitted with values:', values);
        console.log('Is verified:', isVerified);
        console.log('Form errors:', form.formState.errors);
        
        if (!isVerified) {
            console.log('Form submission blocked - verification not checked');
            return;
        }
        
        try {
            // Start the transaction loading dialog
            onTransactionStart?.();

            // Make the actual API call and get the created transaction
            // const newTransaction = await api.transaction.makeTransaction(Number(values.amount), values.receiverEmail);

            // Pass the new transaction to the parent component
            // onSubmitSuccess?.(newTransaction);
        } catch (error) {
            console.error('Transaction failed:', error);
            // Call the error handler to show failure state
            onTransactionError?.();
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        console.log('Form submit event triggered');
        e.preventDefault();
        form.handleSubmit(onSubmit)();
    };

    return (
        <div
            className={`transition-all duration-300 ease-in-out ${
                isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
            }`}
        >
            <div className="text-center space-y-4 mb-6">
                <div className="flex items-center justify-center">
                    <img src={moneyFlies} alt="Money icon" className="h-8 w-8 mr-2" />
                    <h2 className="text-2xl font-bold">Send Money</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-400 text-center">
                    Enter the recipient's email and the amount you want to send
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                <FormField
                    control={form.control}
                    name="receiverEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Who gets the money? (email address)</FormLabel>
                            <FormControl>
                                <Input placeholder="recipient@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="0"
                                        {...field}
                                        className=" pr-8"
                                        onChange={(e) => {
                                            const { value } = e.target;
                                            if (value === '' || /^\d+$/.test(value)) {
                                                field.onChange(e);
                                                form.clearErrors('amount');
                                            } else {
                                                form.setError('amount', {
                                                    type: 'manual',
                                                    message: 'Amount must contain numbers only',
                                                });
                                            }
                                        }}
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                                        ₪
                                    </span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="border border-red-400 dark: rounded-md p-4 space-y-3">
                    <div className="flex items-start space-x-3">
                        <Checkbox
                            id="verification"
                            checked={isVerified}
                            onCheckedChange={(checked) => setIsVerified(checked as boolean)}
                        />
                        <Label
                            htmlFor="verification"
                            className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer"
                        >
                            I have verified the recipient details and amount. I understand this transaction is immediate
                            and cannot be undone.
                        </Label>
                    </div>
                </div>
                <div className="flex justify-center">
                    <SendMoneyButton 
                        type="submit" 
                        icon={buttonIcon} 
                        variant={buttonVariant} 
                        disabled={!isVerified}
                        onClick={() => console.log('SendMoneyButton clicked, isVerified:', isVerified)}
                    />
                </div>
            </form>
        </Form>
        </div>
    );
};
