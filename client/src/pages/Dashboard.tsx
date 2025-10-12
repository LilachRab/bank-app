import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { Header } from '@/components/Header';
import { LogOut } from 'lucide-react';
import { PURPLE_GRADIENT_BG } from '@/constants';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/ui/typography';
import { useState, useEffect } from 'react';
import { TransactionList } from '@/components/TransactionList';
import { TransactionDialog } from '@/components/TransactionDialog';
import { SendMoneyButton } from '@/components/SendMoneyButton';
import type { Transaction } from '@/types/transaction';

// Mock transactions for testing pagination
const generateMockTransactions = (userEmail: string): Transaction[] => {
    const mockEmails = [
        'alice@example.com',
        'bob@example.com',
        'charlie@example.com',
        'diana@example.com',
        'eve@example.com',
        'frank@example.com',
        'grace@example.com',
        'henry@example.com',
        'iris@example.com',
        'jack@example.com',
    ];

    const mockTransactions: Transaction[] = [];
    const now = new Date();

    for (let i = 0; i < 13; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        const isSent = i % 3 !== 0; // Mix of sent and received
        const otherEmail = mockEmails[i % mockEmails.length];

        mockTransactions.push({
            id: `mock-${i + 1}`,
            amount: Math.floor(Math.random() * 900) + 100, // Random amount between 100-1000
            senderEmail: isSent ? userEmail : otherEmail,
            receiverEmail: isSent ? otherEmail : userEmail,
            createdAt: date.toISOString(),
        });
    }

    return mockTransactions;
};

export const Dashboard = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [userEmail, setUserEmail] = useState<string>('');
    const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userTransactions, userData] = await Promise.all([
                    api.transaction.getTransactions(),
                    api.user.getUser(),
                ]);

                // Use mock transactions for testing if no real transactions exist
                const mockTransactions = generateMockTransactions(userData.email);
                setTransactions(userTransactions.length > 0 ? userTransactions : mockTransactions);
                setUserEmail(userData.email);
            } catch (error) {
                console.error(error);
                // If API fails, use mock data with a default email
                const defaultEmail = 'user@example.com';
                setUserEmail(defaultEmail);
                setTransactions(generateMockTransactions(defaultEmail));
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        await api.auth.logout();
        navigate('/');
    };

    const handleSendMoneyClick = () => {
        setIsTransactionDialogOpen(true);
    };

    const addNewTransaction = (newTransaction?: Transaction) => {
        // Add new transaction to the beginning of the list (most recent first)
        if (newTransaction) {
            setTransactions((prev) => [newTransaction, ...prev]);
        }
    };

    // TODO: Fetch user's name and balance from the API
    const userName = 'John Doe';
    const userBalance = '1,234.56';

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <Header
                rightContent={
                    <Button
                        onClick={handleLogout}
                        className="flex items-center text-sm font-medium text-white transform transition-transform hover:scale-105"
                        style={{ background: PURPLE_GRADIENT_BG }}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                    </Button>
                }
            />

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12 text-center">
                <PageTitle variant="light">Welcome {userName}</PageTitle>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Your balance</p>
                <div className="mt-4 text-6xl font-bold text-gray-800 dark:text-gray-50 flex items-center justify-center">
                    {userBalance}
                    <span className="mr-4 ml-2">₪</span>
                </div>
                <SendMoneyButton className="mt-8" onClick={handleSendMoneyClick} />
                <TransactionDialog
                    open={isTransactionDialogOpen}
                    onOpenChange={setIsTransactionDialogOpen}
                    onTransactionSuccess={addNewTransaction}
                />
                <TransactionList transactions={transactions} userEmail={userEmail} />
            </main>
        </div>
    );
};
