import { Injectable } from '@nestjs/common';
import { Game } from './game.model';

@Injectable()
export class GameService {

  private games: Game[] = []

  createGame(): Game {
    const game = new Game(this.generateId())
    this.games.push(game)
    return game
  }

  private generateId(): string {
    return Math.random().toString()
  }

}
