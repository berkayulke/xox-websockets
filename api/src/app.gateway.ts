import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameOverResponse, PlayerMoveResponse } from '../../shared/api-response.model';
import { PlayerMoveRequest, UndoRequest } from '../../shared/api-request.model'
import { GameService } from './game/game.service';

@WebSocketGateway()
export class AppGateway {

  @WebSocketServer() wss: Server

  constructor(
    private readonly gameService: GameService
  ) { }

  @SubscribeMessage('playerMove')
  onPlayerMove(@MessageBody() body: PlayerMoveRequest): void {
    const { rowIndex, squareIndex, gameId } = body
    const game = this.getGame(gameId)

    if (game.isOver()) return

    const playerMoveResponse: PlayerMoveResponse = {
      rowIndex,
      squareIndex,
      turn: game.turn
    }

    this.wss.emit(`playerMove:${gameId}`, playerMoveResponse)
    game.makeMove(rowIndex, squareIndex)

    if (game.isOver()) {
      const gameOverResponse: GameOverResponse = { winner: game.getWinner() }
      this.wss.emit(`gameOver:${gameId}`, gameOverResponse)
    }
  }

  @SubscribeMessage('undo')
  onUndo(@MessageBody() body: UndoRequest): void {
    const game = this.getGame(body.gameId)
    if (game.isOver()) return
    this.wss.emit(`undo:${body.gameId}`, game.undoLastMove())
  }

  private getGame(id: string) {
    const game = this.gameService.getById(id)
    if (!game) throw new Error("Can't find game")
    return game
  }

}
