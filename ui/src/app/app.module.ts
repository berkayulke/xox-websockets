import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BoardRowComponent } from './board/board-row/board-row.component';
import { BoardSquareComponent } from './board/board-row/board-square/board-square.component';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardRowComponent,
    BoardSquareComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SocketIoModule.forRoot({ url: 'http://localhost:3000' })
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
