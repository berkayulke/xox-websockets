import { Board, Player } from '../../../shared/game.types'
type Pair = [number, number]

export class Game {

  board: Board
  turn: Player = 'X'
  private moves: Array<Pair> = []

  isOver(): boolean {
    return !!this.getWinner()
  }

  private _winner: Player

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
      throw "Can't make a move here"

    if (this.turn != player)
      throw "This is not your turn"

    this.moves.push([rowIndex, squareIndex])
    this.board[rowIndex][squareIndex] = this.turn
    this.changeTurns()
  }

  undoLastMove(player: Player): { rowIndex: number, squareIndex: number } {
    if (this.moves.length == 0)
      throw "There are no moves to undo"

    let row = this.moves[this.moves.length - 1][0]
    let square = this.moves[this.moves.length - 1][1]

    if (this.board[row][square] == this.turn || player == this.turn)
      throw "You can't undo other player's move"

    this.moves.pop()
    this.changeTurns()
    this.board[row][square] = ''
    return {
      rowIndex: row,
      squareIndex: square
    }
  }

  private changeTurns() {
    this.turn = this.turn == 'X' ? 'O' : 'X'
  }

  private findWinner(): Player | null {
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