export class Game {

  board: string[][]
  turn: 'X' | 'O' = 'X'

  constructor(
    public id: string,
    public boardSize = 3
  ) {
    this.board = []
    for (let i = 0; i < this.boardSize; i++)
      for (let j = 0; j < this.boardSize; j++)
        this.board[i][j] = "";
  }

}