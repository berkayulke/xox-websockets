import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-create-game-screen',
  templateUrl: './create-game-screen.component.html',
  styleUrls: ['./create-game-screen.component.scss']
})
export class CreateGameScreenComponent implements OnInit {

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
  }

}
