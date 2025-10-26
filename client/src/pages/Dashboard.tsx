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
import type { User } from '@/types/user';
import type { CreateTransactionRequest } from '@/types/transaction';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [user, setUser] = useState<User>({
        email: '',
        firstName: '',
        lastName: '',
        balance: 0,
    });
    const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);

    const getTransactions = async () => {
        try {
            const res = await api.transaction.getTransactions();

            if (res) {
                setTransactions(res);
            }
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        }
    };

    const getUser = async () => {
        try {
            const res = await api.user.getUser();

            if (!res) {
                return;
            }

            setUser(res);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    useEffect(() => {
        getUser();
        getTransactions();
    }, []);

    const handleSignout = async () => {
        await api.auth.signout();
        navigate('/');
    };

    const handleSendMoneyClick = () => {
        setIsTransactionDialogOpen(true);
    };

    const createTransaction = async (transactionData: CreateTransactionRequest) => {
        const response = await api.transaction.makeTransaction(transactionData);

        if (response) {
            await getTransactions();
        }

        return response.message;
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <Header
                rightContent={
                    <Button
                        onClick={handleSignout}
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
                <PageTitle variant="light">
                    Welcome {user.firstName} {user.lastName}
                </PageTitle>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Your balance</p>
                <div className="mt-4 text-6xl font-bold text-gray-800 dark:text-gray-50 flex items-center justify-center">
                    {user.balance.toLocaleString()}
                    <span className="mr-4 ml-2">₪</span>
                </div>
                <SendMoneyButton className="mt-8" onClick={handleSendMoneyClick} />
                <TransactionDialog
                    open={isTransactionDialogOpen}
                    onOpenChange={setIsTransactionDialogOpen}
                    createTransaction={createTransaction}
                />
                <TransactionList transactions={transactions} userEmail={user.email} />
            </main>
        </div>
    );
};
