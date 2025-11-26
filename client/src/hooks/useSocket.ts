import { socket } from '@/sockets/socket';
import type { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/utils/formatters';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useSocket() {
    useEffect(() => {
        const token = sessionStorage.getItem('socketToken');

        if (!token) {
            return;
        }

        socket.auth = { token };

        if (!socket.connected) {
            socket.connect();
        }

        socket.on('money_received', (data: Transaction) => {
            toast.success(`You received ${formatCurrency(data.amount)} from ${data.senderEmail}`);
        });

        // window.dispatchEvent(new Event('refetch-transactions'));

        return () => {
            socket.off('money_received');
        };
    }, []);
}
