import { Injectable } from '@nestjs/common';
import { Game } from './game.model';

@Injectable()
export class GameService {

  private games: { [key: string]: Game }

  createGame(): string {
    const game = new Game(this.generateId())
    this.games[game.id] = game
    return game.id
  }

  getById(id: string): Game {
    return this.games[id]
  }

  deleteById(id: string): void {
    delete this.games[id]
  }

  private generateId(): string {
    return "1"
  }

}
