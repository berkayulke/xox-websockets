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

  makeMove(rowIndex: number, squareIndex: number, player: Player) {
    if (this.board[rowIndex][squareIndex] != '')
      throw new Error("Can't make a move here")

    if (this.turn != player)
      throw new Error("This is not your turn")

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
  for (let i = 0; i < this.boardSize; i++) {
      let thereisawinner: boolean = true;
      if (this.board[i][0] != '') {
        for (let j = 1; j < this.boardSize; j++) {
          if (this.board[i][j] != this.board[i][0]) {
            thereisawinner = false;
            break;
          }
        }
        if (thereisawinner) {
          if (this.board[i][0] == 'X') {
            return 'X';
          }
          else {
            return 'O';
          }
        }
      }
    }
    for (let i = 0; i < this.boardSize; i++) {
      let thereisawinner: boolean = true;
      if (this.board[0][i] != '') {
        for (let j = 1; j < this.boardSize; j++) {
          if (this.board[j][i] != this.board[0][i]) {
            thereisawinner = false;
            break;
          }
        }
        if (thereisawinner) {
          if (this.board[0][i] == 'X') {
            return 'X';
          }
          else {
            return 'O';
          }
        }
      }
    }
    return null
  }

}