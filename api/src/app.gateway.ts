import { UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketMessage } from '../../shared/socket-message.model'

@WebSocketGateway()
@UsePipes(new ValidationPipe({ transform: true }))
export class AppGateway {

  @WebSocketServer() wss: Server

  @SubscribeMessage('playerMove')
  onPlayerMove(@MessageBody() body: SocketMessage): void {
    this.wss.emit('playerMove', body)
  }

}
