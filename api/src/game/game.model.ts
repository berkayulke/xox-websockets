import { Board, Player } from '../../../shared/game.types'

export class Game {
  board: Board
  turn: Player = 'X'
  tour = 0
  private _winner: Player

  isOver(): boolean {
    return !!this.getWinner()
  }

  constructor(
    public id: string,
    public boardSize = 3
  ) {
    this.board = []
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = []
      for (let j = 0; j < this.boardSize; j++)
        this.board[i].push("")
    }
  }

  getWinner(): Player | null {
    if (!this._winner) {
      this._winner = this.findWinner()
    }
    return this._winner
  }

  makeMove(rowIndex: number, squareIndex: number) {
    if (this.board[rowIndex][squareIndex] != '') {
      throw new Error("Can't make a move here")
    }
    this.board[rowIndex][squareIndex] = this.turn
    this.changeTurns()
    this.tour++
  }

  undoLastMove(): { rowIndex: number, squareIndex: number } {
    //TODO add undo logic
    //Cant undo if game is over
    //return last move's row and square index
    this.changeTurns()
    this.tour--
    return {
      rowIndex: 0,
      squareIndex: 0
    }
  }

  private changeTurns() {
    this.turn = this.turn == 'X' ? 'O' : 'X'
  }

  private findWinner(): Player | null {
    /*
      TODO move winner finding logic here
      If there is winner return 'X' or 'O'
      else return null
    */
    return null
  }

}