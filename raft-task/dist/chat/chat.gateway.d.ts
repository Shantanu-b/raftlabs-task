import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway {
    private readonly chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleConnection(socket: Socket): Promise<void>;
    listenForMessages(content: string, socket: Socket): Promise<void>;
    onChat(client: any, message: any): Promise<void>;
}
