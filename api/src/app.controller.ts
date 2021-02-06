import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameService } from './game/game.service';

@Controller('game')
export class AppController {
    constructor(
        private readonly gameService: GameService
    ) { }

    @Post()
    startGame(@Body('boardSize') boardSize: number) {
        return { gameId: this.gameService.createGame(boardSize) }
    }

    @Get(':gameId/finish')
    finishGame(@Param('gameId') gameId: string) {
        this.gameService.deleteById(gameId)
    }

}
