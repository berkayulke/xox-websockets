import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private readonly socket: Socket
  ) {
    this.socket.on('message', data => console.log(data))
    this.socket.emit('message', 'hello there')
  }

}
