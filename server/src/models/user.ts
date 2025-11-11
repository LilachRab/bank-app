export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    balance: number;
}

export interface UserDetailsWithoutPassword {
    email: string;
    firstName: string;
    lastName: string;
    balance: number;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserDetailsWithoutPassword;
    }
}
