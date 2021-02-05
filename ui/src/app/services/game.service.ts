import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketMessage } from '../../../../shared/socket-message.model'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  boardSize: number = 5;
  board: string[][] = []
  tour: number = 0;
  flag: boolean = false;

  constructor(
    private readonly socket: Socket
  ) {
    this.socket.on('message', (data: SocketMessage) => console.log(data))
    const messageToServer = new SocketMessage('Hello from ui')
    this.socket.emit('message', messageToServer)

    for (let i = 0; i < this.boardSize; i++) {
      const row:string[] = [];
      for (let j = 0; j < this.boardSize; j++) {
        row.push('')
      }
      this.board.push(row);
    }

  }

  resetGame() {
    console.log("Yeniden başlatılyor...");
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i][j] = "";
      }
    }
    this.flag = false;
    this.tour = 0;
  }

  onSquareClick(rowIndex: number, squareIndex: number) {
    if (this.flag) {
      return;
    }
    console.log(rowIndex, squareIndex)
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
    for(let i=0;i<this.boardSize;i++){
      let thereisawinner : boolean = true;
      if(this.board[i][0]!=''){
        for(let j=1;j<this.boardSize;j++){
          if(this.board[i][j]!=this.board[i][0]){
            thereisawinner = false;
            break;
          }
        }
        if(thereisawinner){
          if(this.board[i][0]=='X'){
            this.flag=true;
            console.log("1.oyuncu kazandı!");
            return;
          }
          else{
            this.flag=true;
            console.log("2.oyuncu kazandı!");
            return;
          }
        }
      }
    }
    for(let i=0;i<this.boardSize;i++){
      let thereisawinner : boolean = true;
      if(this.board[0][i]!=''){
        for(let j=1;j<this.boardSize;j++){
          if(this.board[j][i]!=this.board[0][i]){
            thereisawinner = false;
            break;
          }
        }
        if(thereisawinner){
          if(this.board[0][i]=='X'){
            this.flag=true;
            console.log("1.oyuncu kazandı!");
            return;
          }
          else{
            this.flag=true;
            console.log("2.oyuncu kazandı!");
            return;
          }
        }
      }
    }
    if(this.board[0][0]!=""){
      let thereisawinner : boolean = true;
      for(let i=1;i<this.boardSize;i++){
        if(this.board[i][i]!=this.board[0][0]){
          thereisawinner=false;
          break;
        }
      }
      if(thereisawinner){
        if(this.board[0][0]=='X'){
          this.flag=true;
          console.log("1.oyuncu kazandı!");
          return;
        }
        else{
          this.flag=true;
          console.log("2.oyuncu kazandı!");
          return;
        }
      }
    }
    if(this.board[0][this.boardSize-1]!=""){
      let thereisawinner : boolean = true;
      for(let i=1;i<this.boardSize;i++){
        if(this.board[i][this.boardSize-i-1]!=this.board[0][this.boardSize-1]){
          thereisawinner=false;
          break;
        }
      }
      if(thereisawinner){
        if(this.board[0][this.boardSize-1]=='X'){
          this.flag=true;
          console.log("1.oyuncu kazandı!");
          return;
        }
        else{
          this.flag=true;
          console.log("2.oyuncu kazandı!");
          return;
        }
      }
    }
    /*for (let i = 0; i < 3; i++) {
      if (this.board[i][0] == "X" && this.board[i][0] == this.board[i][1] && this.board[i][0] == this.board[i][2]) {
        console.log("1.oyuncu kazandi!");
        this.flag = true;
      }
      if (this.board[i][0] == "O" && this.board[i][0] == this.board[i][1] && this.board[i][0] == this.board[i][2]) {
        console.log("2.oyuncu kazandi!");
        this.flag = true;
      }
      if (this.board[0][i] == "X" && this.board[0][i] == this.board[1][i] && this.board[0][i] == this.board[2][i]) {
        console.log("1.oyuncu kazandi!");
        this.flag = true;
      }
      if (this.board[0][i] == "O" && this.board[0][i] == this.board[1][i] && this.board[0][i] == this.board[2][i]) {
        console.log("2.oyuncu kazandi!");
        this.flag = true;
      }
    }
    if (this.board[0][0] == "X" && this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2]) {
      console.log("1.oyuncu kazandi!");
      this.flag = true;
    }
    if (this.board[0][0] == "O" && this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2]) {
      console.log("2.oyuncu kazandi!");
      this.flag = true;
    }
    if (this.board[0][2] == "X" && this.board[0][2] == this.board[1][1] && this.board[0][2] == this.board[2][0]) {
      console.log("1.oyuncu kazandi!");
      this.flag = true;
    }
    if (this.board[0][2] == "O" && this.board[0][2] == this.board[1][1] && this.board[0][2] == this.board[2][0]) {
      console.log("2.oyuncu kazandi!");
      this.flag = true;
    }*/
  }
}
