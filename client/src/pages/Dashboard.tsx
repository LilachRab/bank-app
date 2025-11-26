import { Header } from '@/components/Header';
import { SendMoneyButton } from '@/components/SendMoneyButton';
import { TransactionDialog, TransactionList } from '@/components/Transaction';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/ui/typography';
import { api } from '@/services/api';
import { socket } from '@/sockets/socket';
import type { CreateTransactionRequest, Transaction } from '@/types/transaction';
import type { User } from '@/types/user';
import { formatCurrency } from '@/utils/formatters';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

        socket.on('money_received', handleMoneyReceived);

        return () => {
            socket.off('money_received', handleMoneyReceived);
        };
    }, []);

    const handleSignout = async () => {
        await api.auth.signout();

        sessionStorage.removeItem('socketToken');
        socket.disconnect();

        toast.success('You signed out successfully');
        navigate('/');
    };

    const handleSendMoneyClick = () => {
        setIsTransactionDialogOpen(true);
    };

    const handleMoneyReceived = (transaction: Transaction) => {
        if (transaction) {
            setTransactions((prev) => [transaction, ...prev]);
            setUser((prev) => ({
                ...prev,
                balance: prev.balance + transaction.amount,
            }));
        }
    };

    const handleMoneySent = (transaction: Transaction) => {
        if (transaction) {
            setTransactions((prev) => [transaction, ...prev]);
            setUser((prev) => ({
                ...prev,
                balance: prev.balance - transaction.amount,
            }));
        }
    };

    const createTransaction = async (transactionData: CreateTransactionRequest) => {
        const response = await api.transaction.makeTransaction(transactionData);

        // await Promise.all([getTransactions(), getUser()]);

        if (response.transaction) {
            handleMoneySent(response.transaction);
        }

        return response.message;
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <Header
                rightContent={
                    <Button
                        onClick={handleSignout}
                        variant="destructive"
                        className="flex items-center text-sm font-medium text-white transform transition-transform hover:scale-105 gap-2 bg-gradient-purple"
                    >
                        <LogOut className="h-4 w-4" />
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
                <div className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-50 flex items-center justify-center">
                    {formatCurrency(user.balance)}
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
