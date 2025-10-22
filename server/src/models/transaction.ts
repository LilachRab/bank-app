export interface Transaction {
    id: number;
    amount: number;
    senderEmail: string;
    receiverEmail: string;
}

export interface TransactionInput {
    receiverEmail: string;
    transactionAmount: number;
}
