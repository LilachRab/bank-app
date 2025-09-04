import { User } from '../models/user';

export type CreateUserDto = Omit<User, 'balance'>;
