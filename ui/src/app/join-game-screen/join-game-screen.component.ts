import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-join-game-screen',
  templateUrl: './join-game-screen.component.html',
  styleUrls: ['./join-game-screen.component.scss']
})
export class JoinGameScreenComponent implements OnInit {

  errorMessage: string

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
  }

  tryToJoinGame(gameId: string) {
    this.gameService.joinGameById(gameId)
      .subscribe({
        error: err => this.errorMessage = err
      })
  }
}
