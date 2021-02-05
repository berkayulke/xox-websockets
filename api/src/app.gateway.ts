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
    const gameId = this.gameService.createGame()
    return { event: 'startNewGame', data: gameId }
  }

  @SubscribeMessage('playerMove')
  onPlayerMove(@MessageBody() body: SocketMessage): void {
    const { rowIndex, squareIndex, gameId } = body
    const game = this.gameService.getById(gameId)
    if (!game) throw new Error("Can't find game")
    this.wss.emit(`playerMove:${gameId}`, { rowIndex, squareIndex })
    if (game.isOver)
      this.wss.emit(`gameOver:${gameId}`, { winner: game.winner })
  }

}
