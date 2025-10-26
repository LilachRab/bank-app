import { User } from '../models/user';

export type UserDto = Omit<User, 'balance'>;

export type SigninDto = Pick<User, 'email' | 'password'>;
