export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password?: string; // Password should be optional to avoid exposing it
    balance: number;
}
