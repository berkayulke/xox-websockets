export type BoardSquare = 'X' | 'O' | ''
export type Player = 'X' | 'O'
export type BoardRow = Array<BoardSquare>
export type Board = Array<BoardRow>

export class Game {

  board: Board
  turn: 'X' | 'O' = 'X'
  winner: 'X' | 'O' = null

  get isOver(): boolean {
    return !!this.winner
  }

  constructor(
    public id: string,
    public boardSize = 3
  ) {
    this.board = []
    for (let i = 0; i < this.boardSize; i++)
      for (let j = 0; j < this.boardSize; j++)
        this.board[i][j] = "";
  }

  getWinner(): Player | null {
    return this.getHorizontalWinner() ??
      this.getVerticalWinner() ??
      this.getCrossWinner()
  }

  private getHorizontalWinner(board = this.board): Player | null {
    const winningRow = board.find(row => row[0] != '' && row.every(square => square == row[0]))
    if (!winningRow || winningRow[0] == '') return null
    return winningRow[0]
  }

  private getVerticalWinner(): Player | null {
    return this.getHorizontalWinner(this.getInvertedBoard())
  }

  private getInvertedBoard(): Board {
    return this.board.reduce((acc, row) => {
      row.forEach((val: BoardSquare, index) => acc[index].push('X'))
      return [...acc]
    }, Array.from({ length: this.boardSize }, () => [] as BoardRow))
  }

  private getCrossWinner(): Player | null {
    return this.getFirstDiagonalWinner() ?? this.getSecondDiagonalWinner()
  }

  private getFirstDiagonalWinner(): Player | null {
    if (this.board[0][0] == '')
      return null
    const isFirstDiagonalSame = this.board.reduce((acc, row, rowIndex) => acc && row[rowIndex] == this.board[0][0], true)
    if (isFirstDiagonalSame)
      return this.board[0][0]
    return null
  }

  private getSecondDiagonalWinner(): Player | null {
    if (this.board[0][this.boardSize - 1] == '')
      return null
    const isFirstDiagonalSame = this.board.reduce((acc, row, rowIndex) => acc && row[this.boardSize - rowIndex - 1] == this.board[0][0], true)
    if (isFirstDiagonalSame)
      return this.board[0][this.boardSize - 1] as any
    return null
  }

}