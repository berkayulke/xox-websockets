import { Injectable } from '@nestjs/common';
import { Game } from './game.model';

@Injectable()
export class GameService {

  private gameMap: { [key: string]: Game } = {}

  createGame(boardSize: number): string {
    const game = new Game(this.generateId(), boardSize)
    this.gameMap[game.id] = game
    return game.id
  }

  getById(id: string): Game {
    return this.gameMap[id]
  }

  deleteById(id: string): void {
    delete this.gameMap[id]
  }

  private generateId(): string {
    return Math.random().toString()
  }

}
