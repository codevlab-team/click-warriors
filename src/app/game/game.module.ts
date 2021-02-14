import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScoreboardModule } from '../@components/scoreboard/scoreboard.module';
import { GameRoutingModule } from './game-routing.module';
import { BattlePage } from './pages/battle/battle.page';
import { ScoreboardPage } from './pages/scoreboard/scoreboard.page';

@NgModule({
  declarations: [BattlePage, ScoreboardPage],
  imports: [CommonModule, GameRoutingModule, ScoreboardModule],
})
export class GameModule {}
