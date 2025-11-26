import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Transaction } from '@/components/Transaction/Transaction';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import type { Transaction as TransactionType } from '@/types/transaction';

interface TransactionListProps {
    transactions: TransactionType[];
    userEmail: string;
}

export const TransactionList = ({ transactions, userEmail }: TransactionListProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5; // Show 5 transactions per page

    // Reset to first page when transactions change (new transaction added)
    useEffect(() => {
        setCurrentPage(1);
    }, [transactions.length]);

    // Pagination logic
    const totalPages = Math.ceil(transactions.length / transactionsPerPage);
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const currentTransactions = transactions.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="mt-12 w-full max-w-6xl mx-auto">
            <Label className="text-gray-400 dark:text-gray-600 text-lg mb-4 text-left">Recent Transactions</Label>
            <div className="rounded-xl shadow-md p-6 bg-gradient-purple">
                <div className="rounded-lg overflow-hidden w-full">
                    {currentTransactions.length > 0 ? (
                        currentTransactions.map((transaction: TransactionType) => (
                            <Transaction
                                key={transaction.id}
                                date={transaction.createdAt}
                                sender={transaction.senderEmail}
                                receiver={transaction.receiverEmail}
                                amount={transaction.amount}
                                currentUserEmail={userEmail}
                            />
                        ))
                    ) : (
                        <h2 className="p-8 text-center text-gray-200">No transactions yet</h2>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-4 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                        className={`${
                                            currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                                        } text-gray-100 hover:text-white`}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(page)}
                                            isActive={currentPage === page}
                                            className={`cursor-pointer ${
                                                currentPage === page
                                                    ? 'text-white bg-white/20 border-white/30'
                                                    : 'text-gray-100 hover:text-white hover:bg-white/10'
                                            }`}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                        className={`${
                                            currentPage === totalPages
                                                ? 'pointer-events-none opacity-50'
                                                : 'cursor-pointer'
                                        } text-gray-100 hover:text-white`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
};
