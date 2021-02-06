import { Player } from "./game.types";

export interface StartGameResponse {
    gameId: string
}

export interface PlayerMoveResponse {
    rowIndex: number
    squareIndex: number
    turn: Player
}

export interface GameOverResponse {
    winner: Player
}