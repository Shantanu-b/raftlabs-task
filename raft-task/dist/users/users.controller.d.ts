/// <reference types="express" />
import { UsersService } from './users.service';
import { User } from './users.model';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(password: string, username: string, response: any): Promise<User>;
    findUser(query: any, response: any): Promise<any>;
    updateUser(username: string, newUsername: string, response: any): Promise<any>;
    deleteUser(username: string): Promise<import("mongodb").DeleteResult | import("express").Response<any, Record<string, any>>>;
}
