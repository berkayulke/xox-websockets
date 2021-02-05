import { UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketMessage } from '../../shared/socket-message.model'
import { GameService } from './game/game.service';

@WebSocketGateway()
@UsePipes(new ValidationPipe({ transform: true }))
export class AppGateway {

  @WebSocketServer() wss: Server

  constructor(
    private readonly gameService: GameService
  ) { }

  @SubscribeMessage('startNewGame')
  onStartNewGame(): WsResponse<string> {
    const game = this.gameService.createGame()
    return { event: 'startNewGame', data: game.id }
  }

  @SubscribeMessage('playerMove')
  onPlayerMove(@MessageBody() body: SocketMessage): void {
    this.wss.emit('playerMove' + body.gameId, body)
  }

}
