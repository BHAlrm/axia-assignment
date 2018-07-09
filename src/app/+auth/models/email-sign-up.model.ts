import { UserRole } from './profile.model';

export interface EmailSignUpModel {
    email: string;
    password: string;
    role: UserRole;
}