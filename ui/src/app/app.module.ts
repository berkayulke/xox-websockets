import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CommonModule } from '@angular/common';
import { BoardRowComponent } from './board/board-row/board-row.component';
import { BoardSquareComponent } from './board/board-row/board-square/board-square.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardRowComponent,
    BoardSquareComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
