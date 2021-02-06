export interface PlayerMoveRequest {
  rowIndex: number
  squareIndex: number
  gameId: string
}

export interface UndoRequest {
  gameId: string
}