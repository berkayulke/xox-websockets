import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Board, BoardRow, Player } from '../../../../shared/game.types'
import { GameOverResponse, GetGameResponse, PlayerMoveResponse, StartGameResponse, UndoResponse } from '../../../../shared/api-response.model'
import { PlayerMoveRequest, UndoRequest } from '../../../../shared/api-request.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  boardSize: number;
  board: Board = []
  isGameOver: boolean = false;
  isInGame = false
  gameId: string
  player: Player

  constructor(
    private readonly socket: Socket,
    private readonly http: HttpClient
  ) {
  }

  startNewGame(boardSize: string | number) {
    this.boardSize = parseInt(boardSize.toString())
    if(this.boardSize<=0||this.boardSize!=NaN) return
    this.http.post(`${API_URL}/game/`, { boardSize: this.boardSize })
      .subscribe((response: StartGameResponse) => {
        this.finishGame()
        this.enterGame(response.gameId, 'X');
        console.log('gameId -> ', this.gameId)
      })
  }

  joinGameById(gameId: string): Observable<void> {
    return this.getGameFromApi(gameId).pipe(map(gameResponse => {
      if (!gameResponse.isGameExist)
        throw new Error(`Can't find game with id ${gameId}`)
      this.boardSize = gameResponse.boardSize
      this.enterGame(gameId, 'O')
    }))
  }

  finishGame() {
    if (!this.gameId) return
    this.socket.removeListener(`playerMove:${this.gameId}`)
    this.socket.removeListener(`gameOver:${this.gameId}`)
    this.socket.removeListener(`undo:${this.gameId}`)
    this.http.get(`${API_URL}/game/${this.gameId}/finish`)
      .subscribe(() => this.isInGame = false)
  }

  resetGame() {
    console.log("Yeniden başlatılyor...");
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i][j] = "";
      }
    }
    this.isGameOver = false;
    this.finishGame()
    this.startNewGame(this.boardSize)
  }

  undoLastMove() {
    const undoRequest: UndoRequest = { gameId: this.gameId, player: this.player }
    this.socket.emit('undo', undoRequest)
  }

  onSquareClick(rowIndex: number, squareIndex: number) {
    if (this.isGameOver || this.board[rowIndex][squareIndex] != '')
      return
    this.notifyApiWithPlayerMove(rowIndex, squareIndex)
  }

  private notifyApiWithPlayerMove(rowIndex: number, squareIndex: number) {
    const request: PlayerMoveRequest = {
      rowIndex,
      squareIndex,
      gameId: this.gameId,
      player: this.player
    }
    this.socket.emit('playerMove', request)
  }

  private enterGame(gameId: string, player: Player) {
    this.gameId = gameId;
    this.initializeGameStateListeners();
    this.initializeBoard();
    this.isInGame = true;
    this.player = player;
  }

  private initializeGameStateListeners() {
    this.socket.on(`playerMove:${this.gameId}`, (res: PlayerMoveResponse) => {
      if (this.isGameOver) return
      const { rowIndex, squareIndex, turn } = res
      this.board[rowIndex][squareIndex] = turn
    })

    this.socket.on(`gameOver:${this.gameId}`, (res: GameOverResponse) => {
      console.log('winner is:', res.winner)
      //TODO display it to user
      this.isGameOver = true
    })

    this.socket.on(`undo:${this.gameId}`, (res: UndoResponse) => {
      const { rowIndex, squareIndex } = res
      this.board[rowIndex][squareIndex] = ''
    })
  }

  private getGameFromApi(gameId: string): Observable<GetGameResponse> {
    return this.http.get<GetGameResponse>(`${API_URL}/game/${gameId}`)
  }

  private initializeBoard() {
    for (let i = 0; i < this.boardSize; i++) {
      const row: BoardRow = [];
      for (let j = 0; j < this.boardSize; j++)
        row.push('');
      this.board.push(row);
    }
  }

}
