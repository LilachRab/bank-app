import React from 'react';
import { FormattedEmail } from './FormattedEmail';

export interface TransactionProps {
    date: string;
    sender: string;
    receiver: string;
    amount: number;
    currentUserEmail: string; // Add current user email to determine if they are sender or receiver
}

// Reusable design objects
const labelStyles = {
    base: 'px-2 py-1 rounded-full text-xs font-medium w-16 text-center mr-2 flex-shrink-0',
    variants: {
        date: 'bg-blue-100 text-blue-800',
        from: 'bg-purple-100 text-purple-800',
        to: 'bg-teal-100 text-teal-800',
        amount: 'bg-amber-100 text-amber-800',
    },
};

const sectionStyles = {
    base: 'text-sm flex items-center min-w-0',
    mobile: 'sm:w-1/4',
    amount: 'sm:w-1/4 text-sm flex items-center sm:justify-end min-w-0',
};

const textStyles = {
    content: 'text-gray-800 text-xs sm:text-sm',
    date: 'text-gray-600 text-xs sm:text-sm',
    amount: {
        base: 'font-semibold whitespace-nowrap sm:text-right sm:w-20',
        positive: 'text-green-600',
        negative: 'text-red-600',
    },
};

export const Transaction: React.FC<TransactionProps> = ({ date, sender, receiver, amount, currentUserEmail }) => {
    // If the user is the receiver, the amount is positive; if they are the sender, it's negative
    const isPositive = receiver === currentUserEmail;

    // Format date to include time
    const formattedDate = new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    // Format amount with shekel currency
    const formattedAmount = Math.abs(amount).toLocaleString('he-IL', {
        style: 'currency',
        currency: 'ILS',
    });

    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors gap-2 sm:gap-0">
            {/* Date with time */}
            <div className={`${sectionStyles.mobile} ${sectionStyles.base}`}>
                <span className={`${labelStyles.base} ${labelStyles.variants.date}`}>date</span>
                <span className={textStyles.date}>{formattedDate}</span>
            </div>

            {/* Sender */}
            <div className={`${sectionStyles.mobile} ${sectionStyles.base}`}>
                <span className={`${labelStyles.base} ${labelStyles.variants.from}`}>from</span>
                <span className={textStyles.content}>
                    <FormattedEmail email={sender} />
                </span>
            </div>

            {/* Receiver */}
            <div className={`${sectionStyles.mobile} ${sectionStyles.base}`}>
                <span className={`${labelStyles.base} ${labelStyles.variants.to}`}>to</span>
                <span className={textStyles.content}>
                    <FormattedEmail email={receiver} />
                </span>
            </div>

            {/* Amount */}
            <div className={sectionStyles.amount}>
                <span className={`${labelStyles.base} ${labelStyles.variants.amount}`}>amount</span>
                <span
                    className={`${textStyles.amount.base} ${
                        isPositive ? textStyles.amount.positive : textStyles.amount.negative
                    }`}
                >
                    {isPositive ? '+' : '-'}
                    {formattedAmount}
                </span>
            </div>
        </div>
    );
};
