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
  onPlayerMove(@MessageBody() body: PlayerMoveRequest) {
    const { rowIndex, squareIndex, gameId, player } = body
    const game = this.getGame(gameId)

    if (game.isOver()) return

    const playerMoveResponse: PlayerMoveResponse = {
      rowIndex,
      squareIndex,
      turn: player
    }

    try {
      game.makeMove(rowIndex, squareIndex, player)
      this.wss.emit(`playerMove:${gameId}`, playerMoveResponse)
    } catch (err) {
      return
    }

    if (game.isOver()) {
      const gameOverResponse: GameOverResponse = { winner: game.getWinner() }
      this.wss.emit(`gameOver:${gameId}`, gameOverResponse)
    }
  }

  @SubscribeMessage('undo')
  onUndo(@MessageBody() body: UndoRequest): void {
    const game = this.getGame(body.gameId)
    if (game.isOver()) return
    const lastMove = game.undoLastMove()
    if (lastMove)
      this.wss.emit(`undo:${body.gameId}`, lastMove)
  }

  private getGame(id: string) {
    const game = this.gameService.getById(id)
    if (!game) throw new Error("Can't find game")
    return game
  }

}
