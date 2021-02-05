import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { GameService } from './game/game.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppGateway, GameService],
})
export class AppModule { }
