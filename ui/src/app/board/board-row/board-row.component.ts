import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.scss']
})
export class BoardRowComponent implements OnInit {

  @Input() rowIndex: number

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
  }

  onClick(squareIndex: number) {
    this.gameService.onSquareClick(this.rowIndex, squareIndex)
  }

}
