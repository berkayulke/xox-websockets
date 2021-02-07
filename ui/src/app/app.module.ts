import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BoardRowComponent } from './board/board-row/board-row.component';
import { BoardSquareComponent } from './board/board-row/board-square/board-square.component';
import { GameService } from './services/game.service';
import { StartScreenComponent } from './start-screen/start-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardRowComponent,
    BoardSquareComponent,
    StartScreenComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    SocketIoModule.forRoot({ url: 'http://localhost:3000' })
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
