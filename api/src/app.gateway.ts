import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketMessage } from '../../shared/socket-message.model'

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {

  @WebSocketServer() wss: Server

  private logger = new Logger('AppGateway')

  afterInit() {
    this.logger.log('Initialized')
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: SocketMessage): WsResponse<SocketMessage> {
    this.logger.log("Got the following message from a client: ")
    console.log(body)
    return { event: 'message', data: new SocketMessage('Hello from api') };
  }

}
