import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { GameService } from './game/game.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppGateway, GameService],
})
export class AppModule { }
