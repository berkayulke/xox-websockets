import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {

  @WebSocketServer() wss: Server

  private logger = new Logger('AppGateway')

  afterInit() {
    this.logger.log('Initialized')
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: string): WsResponse<string> {
    this.logger.log("Got the following message from a client",body)
    return { event: 'message', data: 'Hello world!' };
  }

}
