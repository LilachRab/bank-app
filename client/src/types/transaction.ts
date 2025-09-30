export interface Transaction {
    id: string;
    amount: number;
    senderEmail: string;
    receiverEmail: string;
    createdAt: string;
}

export interface CreateTransactionRequest {
    amount: number;
    receiverEmail: string;
}
