import { UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
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

  @SubscribeMessage('playerMove')
  onPlayerMove(@MessageBody() body: SocketMessage): void {
    const { rowIndex, squareIndex, gameId } = body
    const game = this.gameService.getById(gameId)
    if (!game) throw new Error("Can't find game")

    if (game.isOver())
      return

    this.wss.emit(`playerMove:${gameId}`, { rowIndex, squareIndex, turn: game.turn })
    game.makeMove(rowIndex, squareIndex)

    if (game.isOver())
      this.wss.emit(`gameOver:${gameId}`, { winner: game.getWinner() })
  }

}
