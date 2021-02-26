import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameService } from './game/game.service';
import { GetGameResponse, StartGameResponse } from '../../shared/api-response.model'

@Controller('game')
export class AppController {
  constructor(
    private readonly gameService: GameService
  ) { }

  @Post()
  startGame(@Body('boardSize') boardSize: number | string): StartGameResponse {
    boardSize = parseInt(boardSize.toString())
    if (boardSize <= 0 || boardSize == NaN) throw "Board size must be an positive integer";
    return { gameId: this.gameService.createGame(boardSize) }
  }

  @Get(':gameId/finish')
  finishGame(@Param('gameId') gameId: string): void {
    this.gameService.deleteById(gameId)
  }

  @Get(':gameId')
  joinGame(@Param('gameId') gameId: string): GetGameResponse {
    const game = this.gameService.getById(gameId)
    return {
      isGameExist: !!game,
      boardSize: game?.boardSize,
      firstMoveRowIndex: game?.getLastMove()?.rowIndex,
      firstMoveSquareIndex: game?.getLastMove()?.squareIndex
    }
  }

}
