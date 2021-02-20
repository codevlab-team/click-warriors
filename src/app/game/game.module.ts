import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScoreboardModule } from '../@components/scoreboard/scoreboard.module';
import { GameRoutingModule } from './game-routing.module';
import { BattlePage } from './pages/battle/battle.page';

@NgModule({
  declarations: [BattlePage],
  imports: [CommonModule, GameRoutingModule, ScoreboardModule],
})
export class GameModule {}
