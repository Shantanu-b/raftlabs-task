import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(username: string, password: string): Promise<User>;
    getUser(username: string): Promise<User>;
    deleteUser(username: string): Promise<import("mongodb").DeleteResult>;
    updateUsername(username: string, newUsername: string): Promise<Object>;
}
