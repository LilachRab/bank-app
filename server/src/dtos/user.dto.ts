import { User } from '../models/user';

export type UserDto = Omit<User, 'balance'>;

export type LoginDto = Pick<User, 'email' | 'password'>;
