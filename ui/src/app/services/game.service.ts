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

  constructor(
    private readonly socket: Socket
  ) {
    this.socket.on('message', (data: SocketMessage) => console.log(data))
    const messageToServer = new SocketMessage('Hello from ui')
    this.socket.emit('message', messageToServer)
  }

  onSquareClick(rowIndex: number, squareIndex: number) {
    console.log(rowIndex, squareIndex)
  }

}
