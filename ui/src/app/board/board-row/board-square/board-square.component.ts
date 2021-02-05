import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.scss']
})
export class BoardSquareComponent implements OnInit {

  @Input() rowIndex: number
  @Input() squareIndex: number

  @Output() onClick = new EventEmitter<void>()

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
  }

}
