import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { ChatService } from './chat.service';
   
  @WebSocketGateway()
  export class ChatGateway {
    @WebSocketServer()
    server: Server;
    constructor(
        private readonly chatService: ChatService
      ) {
      }
     
      async handleConnection(socket: Socket) {
        await this.chatService.getUserFromSocket(socket);
      }
     
   
    @SubscribeMessage('send_message')
    async  listenForMessages(@MessageBody() content: string, @ConnectedSocket() socket: Socket,) {
        const author = await this.chatService.getUserFromSocket(socket);
        this.server.sockets.emit('receive_message', {content, author});
    }

    @SubscribeMessage('Broadcast')
    async onChat (client, message){
        client.Broadcast.emit('chat',message);
    }
}