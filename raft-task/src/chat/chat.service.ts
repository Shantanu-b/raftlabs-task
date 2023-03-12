import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { UsersService } from 'src/users/users.service';
 
@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UsersService,
  ) {
  }
 
  async getUserFromSocket(socket: Socket) {
    const user = await this.userService.getUser("testsocket");
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }
}