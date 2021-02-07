import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  joinGame: boolean = false
  createGame: boolean = false
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
