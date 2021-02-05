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

  getById(id: string): Game {
    return this.games.find(g => g.id === id)
  }

  deleteById(id: string): void {
    this.games = this.games.filter(g => g.id !== id)
  }

  private generateId(): string {
    return Math.random().toString()
  }

}
