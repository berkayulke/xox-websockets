import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-end-game-screen',
  templateUrl: './end-game-screen.component.html',
  styleUrls: ['./end-game-screen.component.scss']
})
export class EndGameScreenComponent implements OnInit {

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
  }

}
