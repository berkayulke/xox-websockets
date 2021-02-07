import { Player } from "./game.types";

export interface PlayerMoveRequest {
  rowIndex: number
  squareIndex: number
  player: Player
  gameId: string
}

export interface UndoRequest {
  gameId: string
}