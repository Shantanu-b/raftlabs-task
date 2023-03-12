import { Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
export declare class ChatService {
    private readonly userService;
    constructor(userService: UsersService);
    getUserFromSocket(socket: Socket): Promise<import("../users/users.model").User>;
}
