import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketMessage } from '../../../../shared/socket-message.model'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]

  tour : number = 0;

  constructor(
    private readonly socket: Socket
  ) {
    this.socket.on('message', (data: SocketMessage) => console.log(data))
    const messageToServer = new SocketMessage('Hello from ui')
    this.socket.emit('message', messageToServer)
  }

  onSquareClick(rowIndex: number, squareIndex: number) {
    console.log(rowIndex, squareIndex)
    if(this.tour%2==0){
      if(this.board[rowIndex][squareIndex]==''){
        this.board[rowIndex][squareIndex]='X';
        this.tour++;
      }
    }
    else{
      if(this.board[rowIndex][squareIndex]==''){
        this.board[rowIndex][squareIndex]='O';
        this.tour++;
      }
    }
    for(let i=0;i<3;i++){
      if(this.board[i][0]=="X"&&this.board[i][0]==this.board[i][1]&&this.board[i][0]==this.board[i][2]){
        console.log("1.oyuncu kazandi!");
      }
      if(this.board[i][0]=="O"&&this.board[i][0]==this.board[i][1]&&this.board[i][0]==this.board[i][2]){
        console.log("2.oyuncu kazandi!");
      }
      if(this.board[0][i]=="X"&&this.board[0][i]==this.board[1][i]&&this.board[0][i]==this.board[2][i]){
        console.log("1.oyuncu kazandi!");
      }
      if(this.board[0][i]=="O"&&this.board[0][i]==this.board[1][i]&&this.board[0][i]==this.board[2][i]){
        console.log("2.oyuncu kazandi!");
      }
    }
    if(this.board[0][0]=="X"&&this.board[0][0]==this.board[1][1]&&this.board[0][0]==this.board[2][2]){
      console.log("1.oyuncu kazandi!");
    }
    if(this.board[0][0]=="O"&&this.board[0][0]==this.board[1][1]&&this.board[0][0]==this.board[2][2]){
      console.log("2.oyuncu kazandi!");
    }
    if(this.board[0][2]=="X"&&this.board[0][2]==this.board[1][1]&&this.board[0][2]==this.board[2][0]){
      console.log("1.oyuncu kazandi!");
    }
    if(this.board[0][2]=="O"&&this.board[0][2]==this.board[1][1]&&this.board[0][2]==this.board[2][0]){
      console.log("2.oyuncu kazandi!");
    }
  }
}
