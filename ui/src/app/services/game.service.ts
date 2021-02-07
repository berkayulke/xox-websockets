import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Board, BoardRow, Player } from '../../../../shared/game.types'
import { GameOverResponse, IsGameExistResponse, PlayerMoveResponse, StartGameResponse, UndoResponse } from '../../../../shared/api-response.model'
import { PlayerMoveRequest, UndoRequest } from '../../../../shared/api-request.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  boardSize: number = 3;
  board: Board = []
  tour: number = 0;
  isGameOver: boolean = false;
  isInGame = false
  gameId: string

  private player: Player

  constructor(
    private readonly socket: Socket,
    private readonly http: HttpClient
  ) {
    for (let i = 0; i < this.boardSize; i++) {
      const row: BoardRow = [];
      for (let j = 0; j < this.boardSize; j++)
        row.push('')
      this.board.push(row);
    }
  }

  startNewGame() {
    this.http.post(`${API_URL}/game/`, { boardSize: this.boardSize })
      .subscribe((response: StartGameResponse) => {
        this.finishGame()
        this.enterGame(response.gameId, 'X');
        console.log('gameId -> ', this.gameId)
      })
  }

  joinGameById(gameId: string): Observable<void> {
    return this.checkIfGameExist(gameId).pipe(map(isGameExist => {
      if (!isGameExist)
        throw new Error(`Can't find game with id ${gameId}`)
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
    this.tour = 0;
    this.finishGame()
    this.startNewGame()
  }

  undoLastMove() {
    const undoRequest: UndoRequest = { gameId: this.gameId }
    this.socket.emit('undo', undoRequest)
  }

  onSquareClick(rowIndex: number, squareIndex: number) {
    if (this.isGameOver || this.board[rowIndex][squareIndex] != '') {
      return;
    }

    this.notifyApiWithPlayerMove(rowIndex, squareIndex)
    return
    if (this.tour % 2 == 0) {
      if (this.board[rowIndex][squareIndex] == '') {
        this.board[rowIndex][squareIndex] = 'X';
        this.tour++;
      }
    }
    else {
      if (this.board[rowIndex][squareIndex] == '') {
        this.board[rowIndex][squareIndex] = 'O';
        this.tour++;
      }
    }
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
            this.isGameOver = true;
            console.log("1.oyuncu kazandı!");
            return;
          }
          else {
            this.isGameOver = true;
            console.log("2.oyuncu kazandı!");
            return;
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
            this.isGameOver = true;
            console.log("1.oyuncu kazandı!");
            return;
          }
          else {
            this.isGameOver = true;
            console.log("2.oyuncu kazandı!");
            return;
          }
        }
      }
    }
    if (this.board[0][0] != "") {
      let thereisawinner: boolean = true;
      for (let i = 1; i < this.boardSize; i++) {
        if (this.board[i][i] != this.board[0][0]) {
          thereisawinner = false;
          break;
        }
      }
      if (thereisawinner) {
        if (this.board[0][0] == 'X') {
          this.isGameOver = true;
          console.log("1.oyuncu kazandı!");
          return;
        }
        else {
          this.isGameOver = true;
          console.log("2.oyuncu kazandı!");
          return;
        }
      }
    }
    if (this.board[0][this.boardSize - 1] != "") {
      let thereisawinner: boolean = true;
      for (let i = 1; i < this.boardSize; i++) {
        if (this.board[i][this.boardSize - i - 1] != this.board[0][this.boardSize - 1]) {
          thereisawinner = false;
          break;
        }
      }
      if (thereisawinner) {
        if (this.board[0][this.boardSize - 1] == 'X') {
          this.isGameOver = true;
          console.log("1.oyuncu kazandı!");
          return;
        }
        else {
          this.isGameOver = true;
          console.log("2.oyuncu kazandı!");
          return;
        }
      }
    }
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
    this.isInGame = true;
    console.log('setting player to - >', player)
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

  private checkIfGameExist(gameId: string): Observable<boolean> {
    return this.http.get(`${API_URL}/game/${gameId}`)
      .pipe(map((response: IsGameExistResponse) => response.isGameExist))
  }

}
